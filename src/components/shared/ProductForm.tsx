import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { ProductValidation } from '@/lib/validation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
// import { Loader } from '@/components/shared';
import FileUploader from '@/components/shared/FileUploader';
import { Models } from 'appwrite';
import { toast } from 'sonner';
import { CategoryNav, SizesOptions } from '@/lib/constants';
import { Checkbox } from '../ui/checkbox';
import { useCreateProduct, useUpdateProduct } from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SubmitButton from './SubmitButton';

type PostFormProps = {
  product?: Models.Document;
  action: 'Create' | 'Update';
};

export default function ProductForm({ product, action }: PostFormProps) {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const { mutateAsync: createProduct, isPending: isCreating } =
    useCreateProduct();
  const { mutateAsync: updateProduct, isPending: isUpdating } =
    useUpdateProduct();

  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      title: product ? product?.title : '',
      price: product ? product?.price : 0,
      discount: product ? product?.discount : 0,
      category: product ? product?.category : '',
      description: product ? product?.description : '',
      features: product ? product?.features : '',
      sizes: product ? product?.sizes : [],
      files: [],
    },
  });

  async function onSubmit(values: z.infer<typeof ProductValidation>) {
    if (action === 'Create' && !values.files.length) {
      return toast.message('Image upload is required before submission.');
    }

    //! UPDATING
    if (product && action === 'Update') {
      // Utility function to sort sizes
      const sortSizes = (sizes: string[]): string[] => {
        const sizeOrder = ['x-small', 'small', 'medium', 'large', 'x-large'];
        return sizes.sort(
          (a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
        );
      };

      const updatedHome = await updateProduct({
        ...values,
        sizes: sortSizes(values?.sizes || []),
        productId: product?.$id,
        imageIds: product?.imageIds,
        imageUrls: product?.imageUrls,
      });
      if (updatedHome) {
        toast.success('Update successful!');
        return navigate(`/admin/list`);
      }
    }

    //! CREATING
    const newProduct = await createProduct({
      ...values,
      userId: user.id,
    });

    if (newProduct) navigate('/admin/list');
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='bg-white px-6 max-md:px-4 max-sm:px-2 py-3 shadow-md rounded-lg'>
          <div className='space-y-6 pb-8'>
            <div className='grid grid-cols-3 max-lg:grid-cols-1 max-md:grid-cols-3 max-sm:grid-cols-1 gap-x-2 gap-y-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='col-span-2 max-sm:col-span-1'>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a category' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CategoryNav.map((category) => (
                          <SelectItem
                            key={category.label}
                            value={category.label}
                            className='capitalize'>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-x-2 gap-y-6'>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        className='no-arrow'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='discount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        className='no-arrow'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='sizes'
              render={() => (
                <FormItem>
                  <div>
                    <FormLabel className='text-base'>Sizes</FormLabel>
                  </div>
                  <div className='flex flex-wrap items-center gap-x-4 gap-y-5 border py-4 rounded-xl px-2 w-fit'>
                    {SizesOptions.map((item, i) => (
                      <FormField
                        key={i}
                        control={form.control}
                        name='sizes'
                        render={({ field }) => {
                          return (
                            <FormItem key={i}>
                              <FormControl>
                                <Checkbox
                                  className='hidden peer'
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='bg-gray-100 text-sm py-2 px-6 rounded-full cursor-pointer peer-aria-checked:text-white peer-aria-checked:bg-primary'>
                                {item}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='files'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Images</FormLabel>
                  <FormControl>
                    <FileUploader
                      fieldChange={field.onChange}
                      mediaUrl={product?.imageUrls}
                    />
                  </FormControl>
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter short description of product'
                      className='resize-none h-32'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='features'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='100% Cotton, 20% Polyester'
                      className='resize-none h-32'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              text={`${action} Product`}
              isLoading={isCreating || isUpdating}
              className='rounded-full w-full'
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

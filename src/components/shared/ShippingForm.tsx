import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ShippingValidation } from '@/lib/validation';
import {
  useAddShippingInfo,
  useUpdateShippingInfo,
} from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';
import SubmitButton from './SubmitButton';
import { Models } from 'appwrite';

export default function Shipping({
  type,
  shippingInfo,
  setUpdating,
}: {
  type: 'Add' | 'Update';
  shippingInfo?: Models.Document;
  setUpdating?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useUserContext();

  const { mutateAsync: addShipping, isPending: isAdding } =
    useAddShippingInfo();
  const { mutateAsync: updateShipping, isPending: isUpdating } =
    useUpdateShippingInfo();

  const form = useForm<z.infer<typeof ShippingValidation>>({
    resolver: zodResolver(ShippingValidation),
    defaultValues: {
      email: shippingInfo ? shippingInfo?.email : '',
      phoneNumber: shippingInfo ? shippingInfo.phoneNumber : '',
      firstName: shippingInfo ? shippingInfo.firstName : '',
      lastName: shippingInfo ? shippingInfo.lastName : '',
      streetAddress: shippingInfo ? shippingInfo.streetAddress : '',
      state: shippingInfo ? shippingInfo.state : '',
      lga: shippingInfo ? shippingInfo.lga : '',
      zipCode: shippingInfo ? shippingInfo.zipCode : '',
    },
  });

  async function onSubmit(values: z.infer<typeof ShippingValidation>) {
    if (type === 'Add') {
      const shipping = { ...values, user: user.id };
      await addShipping(shipping);
    } else if (type === 'Update') {
      await updateShipping({ documentId: shippingInfo!.$id, shipping: values });
      if (setUpdating) setUpdating(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=''>
        <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='streetAddress'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lga'
            render={({ field }) => (
              <FormItem>
                <FormLabel>LGA</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='state'
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='zipCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SubmitButton
          text={`${type} Shipping Details`}
          isLoading={isAdding || isUpdating}
          className='rounded-full w-full mt-8'
        />
      </form>
    </Form>
  );
}

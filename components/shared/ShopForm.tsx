// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { HomeValidation } from '@/lib/validation';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { useCreateHome, useUpdateHome } from '@/lib/react-query/queries';
// import { useUserContext } from '@/context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { Loader } from '@/components/shared';
// import FileUploader from '@/components/shared/FileUploader';
// import { Models } from 'appwrite';
// import { useToast } from '@/components/ui/use-toast';
// import { LGAs } from '@/lib/constants';

// type PostFormProps = {
//   home?: Models.Document;
//   action: 'Create' | 'Update';
// };

// export default function ShopForm({ home, action }: PostFormProps) {
//   const navigate = useNavigate();
//   const { user } = useUserContext();
//   const { toast } = useToast();

//   const { mutateAsync: createHome, isPending: isCreatingHome } =
//     useCreateHome();
//   const { mutateAsync: updateHome, isPending: isUpdatingHome } =
//     useUpdateHome();

//   const form = useForm<z.infer<typeof HomeValidation>>({
//     resolver: zodResolver(HomeValidation),
//     defaultValues: {
//       title: home ? home?.title : '',
//       price: home ? home?.price : undefined,
//       payment_method: home ? home?.payment_method : '',
//       year_built: home ? home?.year_built : undefined,
//       bathrooms: home ? home?.bathrooms : undefined,
//       bedrooms: home ? home?.bedrooms : undefined,
//       toilets: home ? home?.toilets : undefined,
//       address: home ? home?.address : '',
//       state: 'Lagos',
//       lga: home ? home?.lga : '',
//       description: home ? home?.description : '',
//       features: home ? home?.features.join('.') : '',
//       files: [],
//     },
//   });

//   async function onSubmit(values: z.infer<typeof HomeValidation>) {
//     if (action === 'Create' && !values.files.length) {
//       return toast({
//         variant: 'warning',
//         description: 'Please upload an image before submitting.',
//       });
//     }

//     //! updating
//     if (home && action === 'Update') {
//       const updatedHome = await updateHome({
//         ...values,
//         homeId: home.$id,
//         imageIds: home?.imageIds,
//         imageUrls: home?.imageUrls,
//       });
//       if (updatedHome) {
//         toast({
//           variant: 'success',
//           description: 'Home listing updated successfully.',
//         });
//         return navigate(`/home/${home.$id}`);
//       }
//     }

//     //! creating
//     if (!user.id) {
//       return toast({
//         variant: 'warning',
//         description: 'Sorry, you do not have access to create a document.',
//       });
//     } else {
//       const newHome = await createHome({
//         ...values,
//         userId: user.id,
//         accountId: user.accountId,
//       });

//       if (!newHome) throw Error;
//       navigate(`/listings/${user.id}`);
//     }
//   }

//   return (
//     <div>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className='bg-white px-6 max-md:px-4 max-sm:px-2 py-6 shadow rounded-lg'>
//           <div className='space-y-6 pb-8'>
//             <FormField
//               control={form.control}
//               name='title'
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Title</FormLabel>
//                   <FormControl>
//                     <Input type='text' {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-x-2 gap-y-6'>
//               <FormField
//                 control={form.control}
//                 name='price'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Price</FormLabel>
//                     <FormControl>
//                       <Input
//                         type='number'
//                         {...field}
//                         onChange={(e) => field.onChange(e.target.valueAsNumber)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name='payment_method'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Payment Method</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder='select preferred method' />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value='month'>Monthly</SelectItem>
//                         <SelectItem value='year'>Yearly</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name='year_built'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Year Built</FormLabel>
//                     <FormControl>
//                       <Input
//                         type='number'
//                         {...field}
//                         onChange={(e) => field.onChange(e.target.valueAsNumber)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-x-2 gap-y-6'>
//               <FormField
//                 control={form.control}
//                 name='bedrooms'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>No. of Bedrooms</FormLabel>
//                     <FormControl>
//                       <Input
//                         type='number'
//                         {...field}
//                         onChange={(e) => field.onChange(e.target.valueAsNumber)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name='bathrooms'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>No. of Bathrooms</FormLabel>
//                     <FormControl>
//                       <Input
//                         type='number'
//                         {...field}
//                         onChange={(e) => field.onChange(e.target.valueAsNumber)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name='toilets'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>No. of Toilets</FormLabel>
//                     <FormControl>
//                       <Input
//                         type='number'
//                         {...field}
//                         onChange={(e) => field.onChange(e.target.valueAsNumber)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <FormField
//               control={form.control}
//               name='address'
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Address</FormLabel>
//                   <FormControl>
//                     <Input type='text' {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-x-2 gap-y-6'>
//               <FormField
//                 control={form.control}
//                 name='state'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>State</FormLabel>
//                     <FormControl>
//                       <Input disabled type='text' {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name='lga'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>LGA</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder='select lga' />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {LGAs.map((lga) => (
//                           <SelectItem key={lga.id} value={lga.name}>
//                             {lga.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <FormField
//               control={form.control}
//               name='files'
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Add Photos</FormLabel>
//                   <FormControl>
//                     <FileUploader
//                       fieldChange={field.onChange}
//                       mediaUrl={home?.imageUrls}
//                     />
//                   </FormControl>
//                   <FormMessage className='shad-form_message' />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name='description'
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder='130 - 250 characters'
//                       className='resize-none h-32'
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name='features'
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Features</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder='Enter features separated by periods (full-stop)'
//                       className='resize-none h-32'
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <Button
//             disabled={isCreatingHome || isUpdatingHome}
//             type='submit'
//             className='w-full'>
//             {isCreatingHome || isUpdatingHome ? (
//               <>
//                 <Loader color='white' size={20} />
//                 <span className='pl-1'>Please wait...</span>
//               </>
//             ) : (
//               `${action} Home`
//             )}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }

export default function ShopForm() {
  return <div>ShopForm</div>;
}

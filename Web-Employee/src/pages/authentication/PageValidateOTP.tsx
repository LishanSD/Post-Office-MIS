"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button"
import {
  FormDescription,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import axios from "axios"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import {Toaster} from "../../components/ui/toaster"
import { useToast } from '../../hooks/use-toast';

const formSchema = z.object({
  pin: z.string(),
  
})


export default function ValidateOTP() {
  const { toast } = useToast()
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
      pin: "",
      
      },
  })
  async function validateOTP(values: z.infer<typeof formSchema>){
    const employeeID = localStorage.getItem("employeeID")
    const response = await axios.post("http://localhost:5000/auth/validateOTP", 
      {values,
      time : new Date(),
      employeeID

  })
    console.log(response)
    if(response.data == "valid"){
      navigate("/setpassword")
    }else{
        toast({
          description:response.data,
        })
    }
    
  }
  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center">
    <div className=" bg-white rounded-lg h-96 lg:flex">
    <div className="mr-20 ml-20 mt-8 flex flex-col items-end ">
      <div>
      <div>
      <h1 className="text-2xl mb-5 mt-5">Enter OTP</h1>
      </div>
      <Form {...form}>
      <form onSubmit= {form.handleSubmit(validateOTP)} className="w-2/3 space-y-6">
      <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
        <Button type="submit" className="bg-slate-600 ">Validate OTP</Button>
        <Toaster />
        <Button type="button" className="bg-slate-800 " >Send OTP</Button>

        </div>
          
      </form>
    </Form>
      </div>
    </div>
    </div>
  </div>
)
}
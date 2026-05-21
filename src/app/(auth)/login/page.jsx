"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { Eye, EyeClosed } from "@gravity-ui/icons";
import { Divider } from "@gravity-ui/uikit";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { authClient, signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setAuthError("");
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("You have successfully logged in!", {
    
              actionProps: {
          
                className: "bg-success text-success-foreground",
                
              },
              description: "You can continue Learning with MediQueue.",
            })
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.warning("Login Failed!", {
              actionProps: {
               
                className: "bg-warning text-warning-foreground",
                
              },
            })
          setAuthError(ctx.error.message || "Login failed");
          setLoading(false);
        },
      },
    });

    if (error) {
      setAuthError(error.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Image: full screen on mobile, right half edge-to-edge on md+ */}
      <div className="absolute inset-0 lg:left-1/2 lg:w-1/2">
        <Image
          src="/assets/login.png"
          alt="login"
          fill
          priority
          className="object-cover object-center lg:object-right"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="lg:hidden absolute inset-0 bg-text-dark/45 lg:bg-gradient-to-l lg:from-bg-light lg:via-bg-light/30 lg:to-transparent" />
      </div>

      {/* Form: overlaps image on small screens, flush left on md+ */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-10 sm:px-6 lg:w-1/2 lg:justify-start lg:px-10 xl:px-16 2xl:px-24">
        <div className="w-full max-w-md">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl font-bold text-white lg:text-primary">
              Hi There! Welcome Back!
            </h1>
            <p className="text-white/80 lg:text-gray-500">
              Have we met before?
            </p>
          </div>

          <Form
            className="flex w-full flex-col gap-4 rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:p-8 lg:bg-bg-light lg:p-10 lg:shadow-xl lg:backdrop-blur-none"
            render={(props) => <form {...props} />}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              isRequired
              name="email"
              type="email"
              {...register("email")}
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pr-18 w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </button>
              </div>
              <Description>
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>

            {authError && (
              <p className="text-sm text-red-600">{authError}</p>
            )}

            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-primary"
                isDisabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Divider className=" h-1 my-2 border-b border-gray-300"/>

              <Link href="/register">
                <Button variant="outline" className="w-full border-primary">
                  Signup
                </Button>
              </Link>
              
                <Button onClick={() => signIn()} variant="outline" className="w-full border-primary">
                  Login With Google
                </Button>
             
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

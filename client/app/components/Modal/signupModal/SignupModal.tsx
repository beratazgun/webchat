"use client";
import dynamic from "next/dynamic";
import { isEmpty } from "lodash";

import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import registerOptions from "./registerOptions";
import Button from "../../button/Button";
import Heading from "../../Heading";
import Input from "../../Inputs/Input";
import CloseButton from "../../button/CloseButton";
import { useModal } from "@/app/hooks/useModal";

const Modal = dynamic(() => import("../Modal"));

async function signup(data: FieldValues) {
  const res = await fetch(`http://localhost:3005/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res.json();
}

const SignupModal = () => {
  const { openModal, closeModal } = useModal();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      signupUsername: "",
      signupPassword: "password",
    },
    mode: "all",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const res = await signup({
        username: getValues("signupUsername"),
        password: getValues("signupPassword"),
      });

      if (res.isSuccess) {
        toast.success(res.message, {
          duration: 2000,
        });
        setTimeout(() => {
          closeModal("signup-modal");

          setTimeout(() => {
            openModal("signin-modal");
          }, 500);
        }, 2500);
      }
      if (!res.isSuccess) {
        toast.error(res.message.email, {
          duration: 2000,
        });
      }
    },
  });

  const closeButton = (
    <CloseButton
      className="p-1 border-0 hover:opacity-70 hover:bg-slate-100 rounded-full transition absolute left-9"
      onClick={() => closeModal("signup-modal")}
    />
  );

  const body = (
    <form
      className="flex flex-col gap-6 w-full px-6 2xl:h-[27rem] xl:h-[27rem] md:h-[27rem] lg:h-[27rem] sm:h-[27rem] pb-4"
      onSubmit={handleSubmit((data) => data)}
    >
      <Heading title="Get started" subtitle="Create your account now!" />
      <Input
        type="text"
        label="Username"
        register={register}
        id="signupUsername"
        registerOptions={registerOptions.signupUsername}
        errors={errors}
      />

      <Input
        type="password"
        label="Password"
        register={register}
        id="signupPassword"
        registerOptions={registerOptions.signupPassword}
        errors={errors}
      />

      <Button
        label="Sign Up"
        onClick={() => mutate()}
        isLoading={isLoading}
        disable={isEmpty(errors) ? false : true}
      />
    </form>
  );

  return (
    <Modal
      title="Sign Up"
      body={body}
      closeButton={closeButton}
      modalId="signup-modal"
    />
  );
};

export default SignupModal;

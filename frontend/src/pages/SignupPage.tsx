import { AccountCreationForm } from "@/components/AccountCreationForm";

const SignupPage = () => {
  return (
    <div className="bg-muted flex h-full flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <AccountCreationForm mode="signup" />
      </div>
    </div>
  );
};

export default SignupPage;

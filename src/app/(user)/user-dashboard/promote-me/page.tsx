import ClimateProfileForm from "./_components/ClimateProfileForm";

export default function PromoteMePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#004242]">Promote Me</h1>
        <p className="mt-3 text-sm text-gray-500">
          Introduce yourself, share your experience, and connect with the
          climate community.
        </p>
      </div>
      <ClimateProfileForm />
    </div>
  );
}

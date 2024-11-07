import Image from 'next/image';

export default function Registrer(): JSX.Element {
  return (
    <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container">
            <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                <Image src="/assets/icons/logo.svg" alt="logo-carepulse" width={1000} height={1000} />
            </div>
        </section>
    </div>
  );
}
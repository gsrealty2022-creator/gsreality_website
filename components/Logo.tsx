import Image from 'next/image';

interface LogoProps {
  size?: 'navbar' | 'footer';
}

export default function Logo({ size = 'navbar' }: LogoProps) {
  const sizeConfig = {
    navbar: {
      width: 300,
      height: 300,
      className: 'h-20 w-auto object-contain',
    },
    footer: {
      width: 180,
      height: 72,
      className: 'h-16 w-auto object-contain',
    },
  };

  const config = sizeConfig[size];

  return (
    <div className="flex items-center">
      <Image
        src="/gs_reality.png"
        alt="GS Reality Logo"
        width={config.width}
        height={config.height}
        className={config.className}
        priority={size === 'navbar'}
      />
    </div>
  );
}


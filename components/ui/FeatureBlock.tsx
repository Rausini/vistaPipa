export type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export function FeatureBlock({ feature }: { feature: Feature }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sand-200 text-brown-dark">
        {feature.icon}
      </div>
      <h3 className="font-display text-xl">{feature.title}</h3>
      <p className="max-w-xs text-sm leading-relaxed text-brown-dark">
        {feature.description}
      </p>
    </div>
  );
}

import { Helmet } from "react-helmet-async";

type CustomPageHeaderProps = {
  children?: React.ReactNode;
  title?: string;
};

type CustomPageMetadataDescriptionProps = {
  description: string;
};

type CustomPageMetadataRobotsProps = {
  forceNoIndex?: boolean;
};

function CustomPageMetadataRoot({ title = "LuckySea", children }: CustomPageHeaderProps) {
  return (
    <Helmet>
      <title>{title}</title>
      {children}
    </Helmet>
  );
}

function CustomPageMetadataDescription({ description }: CustomPageMetadataDescriptionProps) {
  const isDev = process.env.NODE_ENV === "dev";
  return <>{isDev ? <></> : <meta name="description" content={description} />}</>;
}

function CustomPageMetadataRobots({ forceNoIndex }: CustomPageMetadataRobotsProps) {
  const isDev = process.env.NODE_ENV === "dev";

  return (
    <>
      {isDev ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : forceNoIndex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <meta name="robots" content="index" />
      )}
    </>
  );
}

export const CustomPageMetadata = {
  Root: CustomPageMetadataRoot,
  Description: CustomPageMetadataDescription,
  Robots: CustomPageMetadataRobots
};

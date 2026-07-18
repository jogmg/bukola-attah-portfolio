interface IPortfolioItemPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PortfolioItemPage({
  params,
}: IPortfolioItemPageProps) {
  const { slug } = await params;

  return <div>PortfolioItemPage {slug}</div>;
}

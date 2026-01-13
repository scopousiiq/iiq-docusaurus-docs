import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="hero">
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className="hero__buttons">
          <Link className="button button--primary button--lg" to="/docs/">
            Get Started
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/api/tickets/tickets-api">
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({title, description, link, linkText}: {
  title: string;
  description: string;
  link: string;
  linkText: string;
}) {
  return (
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link}>{linkText} &rarr;</Link>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className="features">
      <div className="container">
        <div className="features__grid">
          <FeatureCard
            title="Getting Started"
            description="Learn the basics of authenticating and making your first API call to IncidentIQ."
            link="/docs/"
            linkText="Read the guide"
          />
          <FeatureCard
            title="API Reference"
            description="Complete documentation for all 700+ API endpoints organized by category."
            link="/docs/api/tickets/tickets-api"
            linkText="Browse endpoints"
          />
          <FeatureCard
            title="Tickets API"
            description="Create, update, and manage help desk tickets programmatically."
            link="/docs/api/tickets/tickets-api"
            linkText="View Tickets API"
          />
          <FeatureCard
            title="Assets API"
            description="Manage device inventory, assignments, and asset lifecycle."
            link="/docs/api/assets/assets-api"
            linkText="View Assets API"
          />
          <FeatureCard
            title="Users API"
            description="Access user accounts, roles, and permissions data."
            link="/docs/api/users/users-api"
            linkText="View Users API"
          />
          <FeatureCard
            title="Inventory API"
            description="Track parts, stock levels, and inventory transactions."
            link="/docs/api/inventory/inventory-api"
            linkText="View Inventory API"
          />
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

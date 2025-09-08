import { useEffect } from 'react';
import logo from '../zyntax_logo.svg';

function DocsPage() {
  useEffect(() => {
    document.title = 'Zyntax';
    const setFavicon = (href) => {
      let link = document.querySelector("link[rel='icon']");
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'icon');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };
    setFavicon(logo);
    return () => {};
  }, []);


  return (
    <div className="docs-app">
      <a href="#main" className="skip-link">Skip to content</a>

      <header className="docs-header">
        <div className="header-inner">
          <div className="brand-group">
            <img src={logo} className="brand-logo App-logo" alt="Zyntax logo" />
            <div className="brand-text">
              <h1 className="brand-title">Zyntax</h1>
              <p className="brand-tagline">A platform to guide you to new tech</p>
            </div>
          </div>
        </div>
      </header>

      <div className="docs-layout">
        <aside className="docs-sidebar" aria-label="Secondary navigation">
          <nav className="sidebar-nav">
            <p className="nav-heading">Getting Started</p>
            <a href="#introduction" className="sidebar-link">Introduction</a>
            <a href="#prerequisites" className="sidebar-link">Prerequisites</a>
            <a href="#installation" className="sidebar-link">Installation</a>
            <a href="#setup" className="sidebar-link">Setup</a>

            <p className="nav-heading">Core</p>
            <a href="#usage" className="sidebar-link">Usage</a>
            <a href="#configuration" className="sidebar-link">Configuration</a>
            <a href="#examples" className="sidebar-link">Examples</a>

            <p className="nav-heading">Reference</p>
            <a href="#api" className="sidebar-link">API</a>
            <a href="#cli" className="sidebar-link">CLI</a>

            <p className="nav-heading">Help</p>
            <a href="#troubleshooting" className="sidebar-link">Troubleshooting</a>
            <a href="#faq" className="sidebar-link">FAQ</a>
            <a href="#contributing" className="sidebar-link">Contributing</a>
            <a href="#license" className="sidebar-link">License</a>
          </nav>
        </aside>

        <main id="main" className="docs-content" tabIndex={-1}>
          <section id="introduction" className="content-section">
            <h2 className="section-title">Introduction</h2>
            <p className="section-lead">
              WSO2 API Manager is a full lifecycle API management platform to design, build, publish, secure, monetize, and observe APIs.
              It provides a gateway, developer portal, publisher, and rich analytics for on‑prem, cloud, and hybrid deployments.
            </p>
          </section>

          <section id="prerequisites" className="content-section">
            <h2 className="section-title">Prerequisites</h2>
            <ul className="list">
              <li>Java 11 or 17 (LTS)</li>
              <li>Docker (optional, recommended for quick start)</li>
              <li>WSO2 API Controller (apictl) for CLI workflows</li>
            </ul>
          </section>

          <section id="installation" className="content-section">
            <h2 className="section-title">Installation</h2>
            <p>Run WSO2 API Manager using Docker:</p>
            <pre className="code-block" aria-label="Docker commands"><code>{`docker pull wso2/wso2am:latest\ndocker run -d --name wso2am \
  -p 9443:9443 -p 8243:8243 -p 8280:8280 \
  wso2/wso2am:latest`}</code></pre>
            <p>Or download the distribution, extract, and start:</p>
            <pre className="code-block" aria-label="Binary start"><code>{`unzip wso2am-*.zip\ncd wso2am-*/bin\nsh api-manager.sh`}</code></pre>
          </section>

          <section id="setup" className="content-section">
            <h2 className="section-title">Setup</h2>
            <p>After startup, access the portals:</p>
            <ul className="list">
              <li>Publisher: https://localhost:9443/publisher</li>
              <li>Dev Portal: https://localhost:9443/devportal</li>
            </ul>
            <p>Install and configure the API Controller (apictl):</p>
            <pre className="code-block" aria-label="apictl install"><code>{`# macOS\nbrew tap wso2/tap\nbrew install apictl\n\n# Linux\ncurl -L https://github.com/wso2/product-apim-tooling/releases/latest/download/apictl-linux-x64.tar.gz | tar -xz\nsudo mv apictl /usr/local/bin/`}</code></pre>
          </section>

          <section id="usage" className="content-section">
            <h2 className="section-title">Usage</h2>
            <p>Create and publish an API via the Publisher, then subscribe and invoke via the Dev Portal.</p>
            <pre className="code-block" aria-label="Create API with apictl"><code>{`# Login to an environment\napictl add env dev --apim https://localhost:9443\napictl login dev -u admin -p admin --insecure\n\n# Initialize, import, and publish an API\napictl init Petstore --oas https://petstore3.swagger.io/api/v3/openapi.json\napictl import api -f Petstore -e dev --update\napictl change status api -n Petstore -v 1.0.0 -s PUBLISHED -e dev`}</code></pre>
          </section>

          <section id="configuration" className="content-section">
            <h2 className="section-title">Configuration</h2>
            <p>Update deployment settings in <code>repository/resources/conf/deployment.toml</code>:</p>
            <pre className="code-block" aria-label="deployment.toml"><code>{`[apim.throttling]\nenable_data_publishing = true\n\n[[apim.gateway.environment]]\nname = "Production and Sandbox"\nhost = "localhost"\nhttp_endpoint = "http://localhost:8280"\nhttps_endpoint = "https://localhost:8243"\n\n[apim.cors]\nenabled = true\nallow_origins = ["*"]\nallow_methods = ["GET","POST","PUT","DELETE","PATCH","OPTIONS"]\nallow_headers = ["authorization","content-type"]`}</code></pre>
          </section>

          <section id="examples" className="content-section">
            <h2 className="section-title">Examples</h2>
            <h3 className="subheading">Apply a rate limiting policy</h3>
            <pre className="code-block"><code>{`apictl apply rate-limiting -n Bronze -q 100PerMin -e dev`}</code></pre>
            <h3 className="subheading">Create a revision and deploy</h3>
            <pre className="code-block"><code>{`apictl add api -n Orders -v 1.0.0 -r https://example.com/orders --type HTTP -e dev\napictl add api revision -n Orders -v 1.0.0 -e dev\napictl deploy api -n Orders -v 1.0.0 -e dev`}</code></pre>
          </section>

          <section id="api" className="content-section">
            <h2 className="section-title">REST APIs</h2>
            <dl className="api-list">
              <dt><code>Publisher and DevPortal REST APIs</code></dt>
              <dd>Automate API lifecycle actions such as create, publish, subscribe, and manage applications.</dd>
              <dt><code>Admin REST API</code></dt>
              <dd>Manage tenants, throttling policies, key managers, and system settings.</dd>
              <dt><code>Analytics</code></dt>
              <dd>Enable analytics to view traffic, latency, and error dashboards for APIs and applications.</dd>
            </dl>
          </section>

          <section id="cli" className="content-section">
            <h2 className="section-title">CLI</h2>
            <pre className="code-block"><code>{`Usage: apictl [command] [options]\n\nCommands:\n  add env <name>                 Add an environment\n  login <env>                    Authenticate to an environment\n  init <apiName>                 Initialize an API project from an OAS\n  import api                     Import/update an API\n  change status api              Change API lifecycle status\n  list apis                      List APIs in an environment`}</code></pre>
          </section>

          <section id="troubleshooting" className="content-section">
            <h2 className="section-title">Troubleshooting</h2>
            <ul className="list">
              <li>Login SSL: use <code>--insecure</code> when testing locally with self‑signed certs.</li>
              <li>Ports in use: stop previous containers or change mapped ports.</li>
              <li>Startup errors: ensure Java 11/17 is on PATH and JAVA_HOME is set.</li>
            </ul>
          </section>

          <section id="faq" className="content-section">
            <h2 className="section-title">FAQ</h2>
            <h3 className="question">Is WSO2 API Manager production‑ready?</h3>
            <p>Yes. It is widely used in production with commercial support and an open‑source license.</p>
            <h3 className="question">Can I manage APIs via GitOps?</h3>
            <p>Yes. Use <code>apictl</code> projects in a repo and promote between environments with CI/CD.</p>
          </section>

          <section id="contributing" className="content-section">
            <h2 className="section-title">Contributing</h2>
            <p>Contributions are welcome. Follow conventional commits and include tests where applicable.</p>
          </section>

          <section id="license" className="content-section">
            <h2 className="section-title">License</h2>
            <p>Apache-2.0</p>
          </section>
        </main>
      </div>

      <footer className="docs-footer">
        <p className="footer-text">© {new Date().getFullYear()} WSO2 API Manager Docs. Built with React. <a className="App-link" href="https://react.dev/" target="_blank" rel="noreferrer noopener">Learn React</a></p>
      </footer>
    </div>
  );
}

export default DocsPage;

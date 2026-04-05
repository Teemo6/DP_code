<p align="center">
    <img src="img/icon.png" alt="GUI 4 Vega"/>
</p>

**GUI 4 Vega** is a React component library that provides a user-friendly interface for creating and customizing [Vega](https://vega.github.io/vega/) visualizations.

Refer to this README or [GUI 4 Vega Documentation](https://relisa.github.io/Vega-GUI/).

## Features

- **React Component**: Easy integration into any React project via `@relisa/gui4vega` package hosted on GitHub Packages registry.
- **UI Frameworks Integration**: Examples provided for [Ant Design](https://ant.design/) (`demo_antd`) and [Bootstrap](https://react-bootstrap.netlify.app/) (`demo_bootstrap`).
- **Embedded Editor**: Interactive JSON editor powered by [CodeMirror](https://codemirror.net/).
- **Data Import**: Built-in support for CSV and JSON data importing.
- **Live Preview**: Real-time updates to the Vega visualization as you edit the specification.
- **Customizable Layout**: Layout with resizable panels for the editor and visualization, supporting light and dark themes.

![GUI 4 Vega](img/intro.jpg)

## Contents

## Requirements

- Node.js >= 18.x
- React >= 18.2.0
- React DOM >= 18.2.0

## Installation
These steps will guide you through the installation of the GUI 4 Vega package in order to include it in your React project.

### Local Installation
To install the package locally, you can clone the repository and build it from source:

```bash
# from root of the repository
cd gui4vega
npm install
npm run build
```

After that you can link the package to your React project:

```bash
cd path/to/your/project
npm link path/to/gui4vega
```

---

This process can be simplified with Vite. You can refer to the [Vite documentation](https://vite.dev/config/shared-options#resolve-alias) for more details or implementation of `vite.config.ts` of both demo applications in the repository.

### GitHub Packages
To install the package, you need access to the GitHub Packages registry.

1. You must request permission from the owner or contributor of the ReliSA GitHub repository hosting GUI 4 Vega package.
2. Create a GitHub Personal Access Token (classic) with the `read:package` scope (no other privileges are required).
3. Create a `.npmrc` file in your project root with the following content (replace the placeholder with your actual token):
   - The `.npmrc` file is also present in the repository.
   - You can also refer to the [GitHub documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry) for more details about GitHub Packages.

```ini
@relisa:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN_WITH_PACKAGE_READ_PERMISSION
```

4. Then, you can install the package in your React project directly using npm:

```bash
npm install @relisa/gui4vega
```

## User Guide

### Run demo applications
Since the demo applications are linked locally to the library, you need to build the library first before running the demos:

```bash
# from root of the repository
cd gui4vega
npm install
npm run build
```

After building the library, you can run either of the demo applications (you dont need to link the library to the demo applications, since they are already linked locally in the repository):

```bash
# from root of the repository
cd demo_antd    # or demo_bootstrap
npm install
npm run dev
```

The applications will be available at `http://localhost:5173` or `http://localhost:5174` respectively.

### Editor
The GUI provides an integrated code editor for updating the Vega visualization specification JSON. Changes to the code automatically reflect on the rendered chart.

## Known Issues and Limitations
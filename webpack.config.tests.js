/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-restricted-syntax */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { getTemplates } = require("./webpack.helper");
const baseConfig = require("./webpack.config.base");

//* To add an extra test this script does not need to be modified.*
//* Please read CONTRIBUTING.MD *
module.exports = async (env) => {
  const entries = {};
  baseConfig.plugins = [];
  baseConfig.plugins.push(
    new ESLintPlugin({
      fix: true,
      extensions: ["ts", "tsx"],
      exclude: ["node_modules", "tests"],
    })
  );

  const getPlugin = (testType, template, chunk, modules) => {
    const plugins = [];

    if (modules) {
      // eslint-disable-next-line guard-for-in
      for (const key in modules) {
        plugins.push(
          new HtmlWebpackPlugin({
            template: `./tests/html-templates/${template.template_id}.html`,
            filename: `./pages/${testType}/${template.pageName}-${key}.html`,
            favicon: "./tests/assets/favicon.png",
            title: "Zappar UAR ThreeJS",
            chunks: [chunk],
            cdnModule: key,
          })
        );
      }
    } else {
      plugins.push(
        new HtmlWebpackPlugin({
          template: `./tests/html-templates/${template.template_id}.html`,
          filename: `./pages/${testType}/${template.pageName}.html`,
          favicon: "./tests/assets/favicon.png",
          title: "Zappar UAR ThreeJS",
          chunks: [chunk],
          cdnModule: false,
        })
      );
    }
    return plugins;
  };

  const setupHtmlWebpackPlugin = (opts) => {
    for (const template of getTemplates(opts)) {
      const chunk = `${opts.templateType}-${template.pageName}`;
      entries[chunk] = `./tests/${opts.templateType}/${template.fullFileName}`;
      const plugins = getPlugin(opts.templateType, template, chunk, opts.modules);
      plugins.forEach((plugin) => baseConfig.plugins.push(plugin)); // todo
    }
  };




  // *Setup Manual and Jest Tests*
  const builds = [
    {
      templateType: "jest/module",
      extension: ".tsx",
    },
    {
      templateType: "manual",
      extension: ".tsx",
    },
  ];

  builds.forEach(setupHtmlWebpackPlugin);


  baseConfig.entry = entries;

  baseConfig.output = {
    filename: "js/[name].js",
    path: `${__dirname}test-dist`,
  };

  baseConfig.devtool = "eval-cheap-source-map";

  baseConfig.devServer = {
    static: "./test-dist",
    https: true,
    host: "0.0.0.0",
    open: false,
    hot: true,
    port: 8082,
    client: {
      overlay: false,
    },
  };

  baseConfig.output.path = path.resolve(__dirname, "test-dist");

  return baseConfig;
};
// = baseConfig;

/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readdirSync } = require("fs");

//* To add an extra test this script does not need to be modified.*
//* Please read CONTRIBUTING.MD *

const getFilesInDirectory = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => !dirent.isDirectory())
    .map((dirent) => dirent.name);

const getTemplates = (opts) => {
  const matchTemplateRegex = /(?:_template)\d{1,}_/;
  const getTemplateNumberFromName = (name) => {
    const selectTemplateRegex = /(?<=_template)\d+?(?=_)/;
    const templateNameRegex = new RegExp(selectTemplateRegex);
    // Check if name contains _templateN_ -> Select the N from _templateN_
    return name.match(matchTemplateRegex) ? templateNameRegex.exec(name)[0] : undefined;
  };
  const files = getFilesInDirectory(`./tests/${opts.templateType}`);
  const templates = [];

  for (const file of files) {
    const HTML_TEMPLATE = getTemplateNumberFromName(file);
    if (HTML_TEMPLATE) {
      templates.push({
        fullFileName: file,
        pageName: file.split(matchTemplateRegex)[1].split(opts.extension)[0],
        template_id: HTML_TEMPLATE,
      });
    }
  }
  return templates;
};


module.exports = { getTemplates };

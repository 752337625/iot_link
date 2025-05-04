import bpmnJS from './bpmn-js';

const zhCN: Record<string, any> = {
  ...bpmnJS,
};
window.a = {};
export function customTranslate(
  template: string,
  replacements: Record<string, any>,
) {
  zhCN[template] ? null : (window.a[template] = '');
  replacements = replacements || {};

  // Translate
  template = zhCN[template] || template;

  // Replace
  return template.replaceAll(/\{([^}]+)\}/g, (_, key) => {
    return replacements[key] || `{${key}}`;
  });
}

export default {
  translate: ['value', customTranslate],
};

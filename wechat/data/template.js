'use strict';

const mongo = require('./mongo');

let templateSchema = new mongo.Schema({
  template_id: String,
  title: String,
  primary_industry: String,
  deputy_industry: String,
  content: String,
  example: String
});
const Template = mongo.model('Template', templateSchema);

// 查询模板by template_id
exports.findTemplateBydId = (template_id) => {
  return Template.find({
    'template_id': template_id
  }).exec();
};

// 添加模板
exports.addTemplate = (template_list) => {
  return Template.create(template_list);
};

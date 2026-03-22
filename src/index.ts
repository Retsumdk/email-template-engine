#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import Handlebars from 'handlebars';

interface EmailTemplate {
  subject: string;
  body: string;
  variables: string[];
}

interface TemplateData {
  [key: string]: string;
}

const program = new Command();

program
  .name('email-template')
  .description('Generate professional emails from templates with variable substitution')
  .version('1.0.0');

program
  .command('init <name>')
  .description('Create a new email template')
  .action((name: string) => {
    const template: EmailTemplate = {
      subject: `Welcome {{name}}!`,
      body: `Hi {{name}},

Thank you for joining our community. We're excited to have you on board!

Best regards,
The Team`,
      variables: ['name']
    };
    
    const filename = `${name}.json`;
    fs.writeFileSync(filename, JSON.stringify(template, null, 2));
    console.log(`✓ Created template: ${filename}`);
  });

program
  .command('render <template>')
  .description('Render a template with variables')
  .option('-v, --vars <vars...>', 'Variables in key=value format')
  .action((template: string, options: { vars?: string[] }) => {
    const data: TemplateData = {};
    
    if (options.vars) {
      options.vars.forEach((v: string) => {
        const [key, value] = v.split('=');
        data[key] = value;
      });
    }
    
    try {
      const content = fs.readFileSync(template, 'utf-8');
      const tmpl = JSON.parse(content) as EmailTemplate;
      
      const subjectTemplate = Handlebars.compile(tmpl.subject);
      const bodyTemplate = Handlebars.compile(tmpl.body);
      
      console.log('\n=== Rendered Email ===\n');
      console.log('Subject:', subjectTemplate(data));
      console.log('\nBody:\n', bodyTemplate(data));
      console.log('\n========================\n');
    } catch (error) {
      console.error('Error rendering template:', (error as Error).message);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all templates in current directory')
  .action(() => {
    const files = fs.readdirSync('.');
    const templates = files.filter(f => f.endsWith('.json'));
    
    if (templates.length === 0) {
      console.log('No templates found.');
      return;
    }
    
    console.log('\nAvailable templates:\n');
    templates.forEach(t => console.log(`  - ${t}`));
    console.log('');
  });

program
  .command('validate <template>')
  .description('Validate a template file')
  .action((template: string) => {
    try {
      const content = fs.readFileSync(template, 'utf-8');
      const tmpl = JSON.parse(content) as EmailTemplate;
      
      if (!tmpl.subject || !tmpl.body) {
        console.error('✗ Template missing required fields: subject, body');
        process.exit(1);
      }
      
      console.log('✓ Template is valid');
      console.log('  Variables:', tmpl.variables?.join(', ') || 'none');
    } catch (error) {
      console.error('✗ Invalid template:', (error as Error).message);
      process.exit(1);
    }
  });

program.parse();

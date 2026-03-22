# Email Template Engine

A CLI tool for generating professional emails from templates with variable substitution and AI enhancement.

## Features

- **Template System**: Create reusable email templates with placeholders
- **Variable Substitution**: Automatically replace variables like `{{name}}`, `{{date}}`, etc.
- **AI Enhancement**: Optionally enhance email content using AI
- **Multiple Formats**: Support for plain text and HTML emails
- **CLI Interface**: Easy-to-use command-line interface

## Installation

```bash
npm install -g email-template-engine
```

## Usage

### Initialize a new template

```bash
email-template init my-template
```

### Render a template with variables

```bash
email-template render my-template.json --vars name="John" subject="Hello"
```

### AI Enhancement

```bash
email-template enhance --input email.txt --tone professional
```

## Template Format

```json
{
  "subject": "Welcome {{name}}!",
  "body": "Hi {{name}},\n\nThank you for joining our community...",
  "variables": ["name"]
}
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `init` | Create a new email template |
| `render` | Render a template with variables |
| `enhance` | AI-enhance email content |
| `list` | List all templates |

## License

MIT

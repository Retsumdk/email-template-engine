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
# Run without installing (recommended for git sources)
npx github:Retsumdk/email-template-engine --help

# Or install globally from a local clone (npm skips devDependencies for
# global git installs, so build from a checkout first)
git clone https://github.com/Retsumdk/email-template-engine.git
cd email-template-engine && npm install && npm run build && npm install -g .
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

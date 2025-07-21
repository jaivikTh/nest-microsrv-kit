# 📚 Documentation Update Scripts

This directory contains scripts to automatically maintain and update project documentation when services are added, removed, or updated.

## 🎯 Purpose

The documentation update script ensures consistency across all documentation files when:
- Adding new microservices
- Removing existing microservices  
- Updating service configurations
- Regenerating all documentation

## 📁 Files

- `update-docs.js` - Main documentation update script
- `templates/SERVICE_TEMPLATE.md` - Template for new service documentation
- `README.md` - This file

## 🚀 Usage

### Using npm scripts (Recommended)

```bash
# Add a new service
npm run docs:add payment-service 3003 "Handles payment processing and transactions"

# Remove a service
npm run docs:remove order-service

# Update existing service documentation
npm run docs:update user-service 3001 "Updated user management service"

# Regenerate all documentation
npm run docs:generate
```

### Using Node.js directly

```bash
# Add a new service
node scripts/update-docs.js add payment-service 3003 "Handles payment processing and transactions"

# Remove a service
node scripts/update-docs.js remove order-service

# Update existing service documentation
node scripts/update-docs.js update user-service 3001 "Updated user management service"

# Regenerate all documentation
node scripts/update-docs.js generate
```

## 📋 Commands

### `add` - Add New Service Documentation

Creates documentation for a new service and updates all related files.

**Syntax:**
```bash
npm run docs:add <service-name> <port> "<description>"
```

**Parameters:**
- `service-name` (required) - Name of the service (e.g., `payment-service`)
- `port` (optional) - Port number for the service (auto-generated if not provided)
- `description` (optional) - Service description (auto-generated if not provided)

**Example:**
```bash
npm run docs:add notification-service 3004 "Handles email and SMS notifications"
```

**What it does:**
- Creates `docs/NOTIFICATION_SERVICE.md` with complete service documentation
- Updates `PROJECT_STRUCTURE.md` services table
- Updates `README.md` API endpoints section
- Updates `api-documentation.md` available endpoints

### `remove` - Remove Service Documentation

Removes documentation for a service and updates all related files.

**Syntax:**
```bash
npm run docs:remove <service-name>
```

**Parameters:**
- `service-name` (required) - Name of the service to remove

**Example:**
```bash
npm run docs:remove order-service
```

**What it does:**
- Deletes `docs/ORDER_SERVICE.md`
- Updates `PROJECT_STRUCTURE.md` services table
- Updates `README.md` API endpoints section
- Updates `api-documentation.md` available endpoints

### `update` - Update Service Documentation

Updates documentation for an existing service.

**Syntax:**
```bash
npm run docs:update <service-name> [port] ["description"]
```

**Parameters:**
- `service-name` (required) - Name of the service to update
- `port` (optional) - New port number (keeps existing if not provided)
- `description` (optional) - New description (keeps existing if not provided)

**Example:**
```bash
npm run docs:update user-service 3001 "Enhanced user management with authentication"
```

**What it does:**
- Recreates service documentation with updated information
- Updates all related documentation files
- Preserves existing information if not specified

### `generate` - Regenerate All Documentation

Scans the project and regenerates all service documentation.

**Syntax:**
```bash
npm run docs:generate
```

**What it does:**
- Scans `apps/` directory for all services
- Generates documentation for each service found
- Updates all project documentation files
- Useful for initial setup or after major changes

## 🔧 How It Works

### Service Detection

The script automatically detects services by:
1. Scanning the `apps/` directory for subdirectories
2. Checking for `src/` subdirectory (indicates a valid service)
3. Reading `main.ts` files to extract port numbers
4. Reading existing documentation to extract descriptions

### Port Assignment

Ports are assigned using this priority:
1. Explicitly provided port parameter
2. Port found in service's `main.ts` file
3. Default ports for known services:
   - `api-gateway`: 3000
   - `user-service`: 3001
   - `order-service`: 3002
4. Auto-generated port starting from 3003

### Template System

New service documentation is generated from `templates/SERVICE_TEMPLATE.md` with these placeholders:

- `{{SERVICE_NAME}}` - Full service name (e.g., `payment-service`)
- `{{SERVICE_NAME_BASE}}` - Base name without `-service` (e.g., `payment`)
- `{{SERVICE_NAME_PASCAL}}` - PascalCase name (e.g., `PaymentService`)
- `{{SERVICE_NAME_UPPER}}` - UPPER_CASE name (e.g., `PAYMENT_SERVICE`)
- `{{SERVICE_NAME_TITLE}}` - Title case (e.g., `Payment Service`)
- `{{SERVICE_PORT}}` - Service port number
- `{{SERVICE_DESCRIPTION}}` - Service description
- `{{CURRENT_DATE}}` - Current date in YYYY-MM-DD format

## 📝 Files Updated

When running the script, these files are automatically updated:

### Service Documentation (`docs/SERVICE_NAME.md`)
- Complete service documentation
- Architecture diagrams
- API patterns and examples
- Configuration details
- Development guides

### Project Structure (`PROJECT_STRUCTURE.md`)
- Services table with ports and descriptions
- Architecture overview
- Last updated timestamp

### README (`README.md`)
- API endpoints section
- Service overview
- Last updated timestamp

### API Documentation (`api-documentation.md`)
- Available endpoints list
- Service-specific API details

## 🔍 Validation

The script performs these validations:

- Checks if service directories exist
- Validates file paths and permissions
- Ensures required documentation files exist
- Provides detailed error messages for troubleshooting

## 🚨 Troubleshooting

### Common Issues

**Script not executable:**
```bash
chmod +x scripts/update-docs.js
```

**Missing service directory:**
- Ensure the service exists in `apps/` directory
- Check that the service has a `src/` subdirectory

**Port conflicts:**
- The script automatically finds available ports
- Manually specify a port if needed

**Permission errors:**
- Ensure write permissions for documentation files
- Check that the `docs/` directory exists

### Debug Mode

For detailed logging, you can modify the script to add more console.log statements or run with Node.js debugging:

```bash
node --inspect scripts/update-docs.js generate
```

## 🔄 Integration with Development Workflow

### When Adding a New Service

1. Create the service in `apps/new-service/`
2. Run `npm run docs:add new-service 3005 "Service description"`
3. Commit both code and documentation changes

### When Removing a Service

1. Remove the service directory from `apps/`
2. Run `npm run docs:remove old-service`
3. Commit the documentation changes

### When Updating a Service

1. Make changes to the service code
2. Run `npm run docs:update service-name` to refresh documentation
3. Commit both code and documentation changes

## 📈 Best Practices

1. **Run after service changes** - Always update documentation when modifying services
2. **Use descriptive descriptions** - Provide clear, concise service descriptions
3. **Keep ports organized** - Use sequential port numbers for consistency
4. **Review generated docs** - Check generated documentation for accuracy
5. **Commit together** - Always commit code and documentation changes together

## 🔧 Customization

### Modifying the Template

Edit `templates/SERVICE_TEMPLATE.md` to customize the generated documentation structure.

### Adding New Placeholders

Modify the `formatServiceName()` function in `update-docs.js` to add new placeholder variables.

### Changing File Locations

Update the `CONFIG` object in `update-docs.js` to change file paths and directories.

## 📚 Related Documentation

- [Project Structure](../PROJECT_STRUCTURE.md)
- [API Documentation](../api-documentation.md)
- [Service Documentation](../docs/)

---

**Last Updated:** 2025-07-18  
**Version:** 1.0.0
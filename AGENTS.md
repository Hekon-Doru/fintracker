# FinTracker Development Agents

This document provides shared guidelines and standards for all development agents working on the FinTracker project. For role-specific instructions, see the individual agent files in the `agents/` directory.

## Agent Files

- **[Frontend Agent](agents/frontend-agent.md)**: React & TypeScript specialist
- **[Backend Agent](agents/backend-agent.md)**: Laravel & PHP specialist
- **[Design Agent](agents/design-agent.md)**: UI/UX and design system specialist

## Shared Principles

All development agents are expected to:
- Be senior-level specialists in their respective domains
- Follow modern best practices and industry standards
- Write clean, maintainable, and testable code
- Prioritize code quality, security, and performance
- Provide constructive and educational feedback during code reviews

## Universal Code Standards

### Naming Conventions

**Variables & Functions**: camelCase
```typescript
const userId = '123';
function getUserData() { }
```

**Constants**: UPPER_SNAKE_CASE
```typescript
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';
```

**Classes & Components**: PascalCase
```typescript
class UserService { }
const UserProfile = () => { };
```

### Core Principles

#### DRY (Don't Repeat Yourself)
- Extract repeated logic into reusable functions
- Create shared utilities for common operations
- Use inheritance, composition, or mixins to avoid duplication

#### Single Responsibility
- Each function should have one clear purpose
- Each class/component should have one reason to change
- Keep functions small and focused (under 20-30 lines)

#### Type Safety
- Enable strict type checking
- Minimize use of `any` (TypeScript) or mixed types (PHP)
- Use explicit type declarations
- Leverage language-specific type systems

## Security Best Practices

### Input Validation
- Validate all user input at application boundaries
- Use allow-lists over deny-lists
- Validate both client-side and server-side
- Sanitize input before processing

### Authentication & Authorization
- Implement proper authentication mechanisms
- Use secure password hashing (bcrypt, argon2)
- Implement role-based access control (RBAC)
- Validate permissions at every access point

### Data Protection
- Never log sensitive data (passwords, tokens, credit cards)
- Use environment variables for secrets
- Implement HTTPS/TLS in production
- Use prepared statements for database queries
- Apply rate limiting to prevent abuse

### Common Vulnerabilities Prevention
- **SQL Injection**: Use ORMs or prepared statements
- **XSS**: Sanitize output, use Content Security Policy
- **CSRF**: Implement CSRF tokens
- **Mass Assignment**: Define allowed fields explicitly

## Error Handling Patterns

### Try-Catch for Risky Operations
```typescript
// TypeScript
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  if (error instanceof SpecificError) {
    handleSpecificError(error);
  } else {
    handleGenericError(error);
  }
} finally {
  cleanup();
}
```

```php
// PHP
try {
    $result = $this->riskyOperation();
    return $result;
} catch (SpecificException $e) {
    $this->handleSpecificError($e);
} catch (Exception $e) {
    $this->handleGenericError($e);
} finally {
    $this->cleanup();
}
```

### Custom Exceptions
- Create specific exception classes for different error scenarios
- Include meaningful error messages
- Add error codes for API responses
- Log detailed errors for debugging

### User-Friendly Messages
- Never expose internal errors to end users
- Provide clear, actionable error messages
- Log detailed errors for debugging
- Return appropriate HTTP status codes

## Performance Optimization

### Query Optimization
- Avoid N+1 query problems
- Use eager loading for relationships
- Implement pagination for large datasets
- Add database indexes for frequently queried fields

### Caching Strategies
- Cache frequently accessed, rarely changed data
- Implement cache invalidation strategies
- Use appropriate cache TTL (Time To Live)
- Cache at appropriate layers

### Code Optimization
- Use memoization for expensive computations
- Implement lazy loading for non-critical resources
- Profile before optimizing (measure first)
- Optimize only when necessary

## Testing Standards

### Test Coverage
- Write tests for critical business logic
- Test edge cases and error scenarios
- Include integration tests for API endpoints
- Mock external dependencies

### Test Structure (AAA Pattern)
```typescript
describe('UserService', () => {
  it('should create a user with valid data', async () => {
    // Arrange
    const userData = { name: 'John', email: 'john@example.com' };
    
    // Act
    const user = await userService.createUser(userData);
    
    // Assert
    expect(user).toBeDefined();
    expect(user.email).toBe(userData.email);
  });
});
```

### Test Best Practices
- Follow AAA pattern (Arrange, Act, Assert)
- Use descriptive test names
- Test one thing per test
- Keep tests independent and isolated
- Clean up test data after execution

## API Design Standards

### RESTful Conventions
- Use plural nouns: `/api/users`, `/api/transactions`
- HTTP methods:
  - `GET`: Retrieve resources
  - `POST`: Create resources
  - `PUT/PATCH`: Update resources
  - `DELETE`: Remove resources
- Use proper HTTP status codes
- Implement versioning: `/api/v1/users`

### Response Format
```json
{
  "data": { "id": "123", "name": "John Doe" },
  "message": "Success"
}
```

### HTTP Status Codes
- **200 OK**: Successful GET, PUT, PATCH
- **201 Created**: Successful POST
- **204 No Content**: Successful DELETE
- **400 Bad Request**: Invalid request
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation failed
- **500 Internal Server Error**: Server error

## Version Control Best Practices

### Commit Messages
Follow conventional commits format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

### Git Workflow
- Keep commits atomic (one logical change)
- Create feature branches for new work
- Review code before merging
- Write meaningful pull request descriptions

## Code Review Guidelines

### When Reviewing Code
- Check for adherence to standards
- Look for potential bugs and edge cases
- Verify test coverage
- Ensure security best practices
- Check for performance issues

### When Receiving Reviews
- Be open to feedback
- Ask questions for clarity
- Explain your reasoning when disagreeing
- Make requested changes promptly

## Accessibility Standards

### General Principles
- Follow WCAG 2.1 AA guidelines
- Test with screen readers
- Ensure keyboard navigation works
- Use semantic HTML elements
- Maintain proper contrast ratios

### Common Patterns
- Use semantic elements: `<nav>`, `<main>`, `<section>`
- Add `alt` text to images
- Provide labels for form inputs
- Ensure proper heading hierarchy
- Make interactive elements keyboard accessible

## Documentation Standards

### Code Comments
- Comment "why" not "what"
- Document complex algorithms
- Explain business logic decisions
- Keep comments up to date

### Project Documentation
- Maintain up-to-date README.md
- Document setup and installation
- Provide API documentation
- Document deployment procedures
- Keep architecture decisions documented

## Environment Configuration

### Environment Variables Pattern
```bash
# Application
APP_NAME=FinTracker
APP_ENV=development|production
APP_DEBUG=true|false

# Database
DB_CONNECTION=mysql|postgresql
DB_HOST=127.0.0.1
DB_DATABASE=fintracker

# External Services
API_KEY=your-api-key
CACHE_DRIVER=redis|file

# Frontend
FRONTEND_URL=http://localhost:3000
API_BASE_URL=http://localhost:8000/api
```

### Configuration Best Practices
- Never commit sensitive data
- Use `.env.example` as template
- Document all environment variables
- Validate required variables on startup

## Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations tested
- [ ] Production builds tested
- [ ] Security audit completed
- [ ] Performance testing done
- [ ] Backup strategy in place
- [ ] Monitoring/logging configured
- [ ] SSL/HTTPS configured
- [ ] Rate limiting enabled
- [ ] Error tracking setup

## Communication Style

### When Providing Feedback
- Be constructive and educational
- Explain the "why" behind recommendations
- Provide code examples
- Reference official documentation
- Suggest incremental improvements
- Acknowledge good practices

### Code Review Comments Format
```markdown
## Good Pattern ✅
This is a great use of composition!

## Suggestion 💡
Consider extracting this logic into a reusable function.

## Issue ⚠️
This could lead to a security vulnerability.
```

---

## Summary

These shared guidelines ensure consistency across all development work in the FinTracker project. When in doubt:

1. **Write Clean Code**: Follow naming conventions, maintain file structure
2. **Prioritize Security**: Validate input, protect data, prevent vulnerabilities
3. **Ensure Quality**: Write tests, handle errors, document thoroughly
4. **Optimize Wisely**: Measure before optimizing, cache appropriately
5. **Collaborate Effectively**: Review constructively, commit meaningfully
6. **Think Accessibility**: Build inclusive products from the start
7. **Deploy Safely**: Test thoroughly, monitor closely

For role-specific instructions, refer to the individual agent files:
- [Frontend Agent](agents/frontend-agent.md)
- [Backend Agent](agents/backend-agent.md)
- [Design Agent](agents/design-agent.md)

# 🤝 JunAiKey Contributing Guide

Welcome to contribute to JunAiKey! We greatly appreciate every contributor's efforts.

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Quick Start](#quick-start)
- [Development Process](#development-process)
- [Pull Request Guide](#pull-request-guide)
- [Code Standards](#code-standards)
- [Testing Standards](#testing-standards)
- [Documentation Standards](#documentation-standards)
- [Contributor Level System](#contributor-level-system)
- [Contribution Rewards](#contribution-rewards)
- [Getting Help](#getting-help)
- [Code of Conduct](#code-of-conduct)
- [Key Contribution Areas](#key-contribution-areas)

## Ways to Contribute

### 1. Code Contribution
- Fix bugs
- Develop new features
- Improve performance
- Refactor code

### 2. Documentation Contribution
- Improve documentation
- Translate documentation
- Write tutorials
- Improve examples

### 3. Design Contribution
- UI/UX improvements
- Icon design
- Visual standards
- Interaction optimization

### 4. Testing Contribution
- Write tests
- Report bugs
- Performance testing
- User experience testing

### 5. Community Contribution
- Answer questions
- Share experiences
- Organize activities
- Promote the project

## Quick Start

### 1. Fork the Project

Fork the [JunAiKey repository](https://github.com/DingJun1028/junaikey) on GitHub

### 2. Clone Locally

```bash
git clone https://github.com/YOUR_USERNAME/junaikey.git
cd junaikey
```

### 3. Add Upstream Repository

```bash
git remote add upstream https://github.com/DingJun1028/junaikey.git
```

### 4. Create Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 5. Install Dependencies

```bash
npm install
```

### 6. Start Development

```bash
npm run dev
```

## Development Process

### 1. Sync Latest Code

```bash
git fetch upstream
git rebase upstream/main
```

### 2. Develop

- Follow code standards
- Write clear commit messages
- Add necessary tests
- Update relevant documentation

### 3. Run Tests

```bash
# Run all tests
npm test

# Run linter
npm run lint

# Type checking
npm run type-check
```

### 4. Commit Code

```bash
git add .
git commit -m "feat: add new feature"
```

#### Commit Message Standards

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code formatting (doesn't affect functionality)
- `refactor`: Refactoring
- `perf`: Performance optimization
- `test`: Test related
- `chore`: Build/tool related

**Example**:
```text
feat(sync): add AITable integration

Add support for syncing data to AITable platform.
Includes API client, data transformation, and error handling.

Closes #123
```

### 5. Push to GitHub

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to your forked repository
2. Click "Compare & pull request"
3. Fill in PR description
4. Wait for review

## Pull Request Guide

### PR Title

Use the same format as commit messages:
```text
feat(sync): add AITable integration
```

### PR Description Template

```markdown
## Change Type
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance optimization
- [ ] Other

## Change Description
<!-- Describe your changes -->

## Related Issues
<!-- Closed issues, e.g., Closes #123 -->

## Testing
<!-- How to test your changes -->

## Screenshots
<!-- Add screenshots if there are UI changes -->

## Checklist
- [ ] Code follows project standards
- [ ] Added necessary tests
- [ ] All tests pass
- [ ] Updated relevant documentation
- [ ] Commit messages follow standards
```

## Code Standards

### TypeScript Standards

```typescript
// ✅ Good practice
interface User {
  id: string;
  name: string;
  email: string;
}

function getUserById(id: string): Promise<User> {
  return api.get(`/users/${id}`);
}

// ❌ Avoid
function getData(x: any): any {
  return x.y;
}
```

### React Component Standards

```typescript
// ✅ Good practice
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

// ❌ Avoid
export function MyButton(props: any) {
  return <button onClick={props.click}>{props.text}</button>;
}
```

### Naming Standards

- **Components**: PascalCase - `UserProfile.tsx`
- **Hooks**: camelCase + use prefix - `useAuth.ts`
- **Utility Functions**: camelCase - `formatDate.ts`
- **Constants**: UPPER_SNAKE_CASE - `MAX_RETRY_COUNT`
- **Types/Interfaces**: PascalCase - `interface UserData`

## Testing Standards

### Unit Tests

```typescript
// ✅ Good test
describe('formatDate', () => {
  it('should format ISO date to readable format', () => {
    const result = formatDate('2025-10-18');
    expect(result).toBe('2025年10月18日');
  });

  it('should handle invalid date', () => {
    const result = formatDate('invalid');
    expect(result).toBe('Invalid Date');
  });
});
```

### Component Tests

```typescript
// ✅ Good component test
describe('Button', () => {
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button label="Click me" onClick={handleClick} />
    );
    
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    const { getByRole } = render(
      <Button label="Click me" onClick={() => {}} disabled />
    );
    
    expect(getByRole('button')).toBeDisabled();
  });
});
```

## Documentation Standards

### Code Comments

```typescript
/**
 * Format date as readable string
 * 
 * @param date - Date string in ISO format
 * @param format - Date format (optional)
 * @returns Formatted date string
 * 
 * @example
 * ```ts
 * formatDate('2025-10-18')  // '2025年10月18日'
 * formatDate('2025-10-18', 'MM/DD/YYYY')  // '10/18/2025'
 * ```
 */
export function formatDate(
  date: string, 
  format?: string
): string {
  // Implementation logic
}
```

### Markdown Documentation

- Use clear heading hierarchy
- Add table of contents (for long documents)
- Use code blocks with language tags
- Add appropriate examples
- Use tables to organize information
- Add links to related documentation

## Contributor Level System

### Level 1: Awakened
**Condition**: First contribution

**Permissions**:
- Create issues
- Participate in discussions
- View source code

**Rewards**:
- Contributor badge
- Appear in contributor list

### Level 2: Resonant
**Condition**: 5 valid contributions

**Permissions**:
- Create branches
- Participate in code review
- Label issues

**Rewards**:
- Exclusive avatar frame
- Early feature access

### Level 3: Fused
**Condition**: 20 valid contributions

**Permissions**:
- Push branches
- Close issues
- Manage labels

**Rewards**:
- Core contributor certification
- Project decision voting rights

### Level 4: Legendary
**Condition**: 50 valid contributions

**Permissions**:
- Merge PRs
- Release versions
- Manage milestones

**Rewards**:
- Maintainer status
- Official recommendation letter

### Level 5: Eternal
**Condition**: Core contributor, long-term participation

**Permissions**:
- All permissions
- Decision making
- Team management

**Rewards**:
- Permanent core team member
- Project co-ownership

## Contribution Rewards

### Instant Rewards
- Experience points for each merged PR
- Unlock corresponding elemental spirits
- Avatar level progression

### Milestone Rewards
- 10 contributions: Exclusive T-shirt
- 25 contributions: Custom merchandise package
- 50 contributions: Annual contributor bonus
- 100 contributions: Permanent honorary title

### Special Awards
- **Best Newcomer Award**: Most active among new contributors
- **Best Contribution Award**: Most impactful annual contribution
- **Community Star**: Most helpful to others
- **Innovation Pioneer**: Most creative feature proposal

## Getting Help

### Development Questions
- [GitHub Discussions](https://github.com/DingJun1028/junaikey/discussions) - Technical discussions
- [Discord Community](https://discord.gg/junaikey) *(planned)* - Real-time communication
- [Developer Documentation](../readme.md) - Development guide

### Bug Reports
- [Issue Tracker](https://github.com/DingJun1028/junaikey/issues)
- Use bug report template
- Provide reproduction steps

### Feature Suggestions
- [Feature Requests](https://github.com/DingJun1028/junaikey/discussions/categories/ideas)
- Describe use cases in detail
- Explain expected effects

## Code of Conduct

### Our Pledge

To create an open and friendly environment, we pledge:

- Respect all contributors
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Our Standards

Positive behaviors include:

- Using friendly and inclusive language
- Respecting different viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy towards other community members

Unacceptable behaviors include:

- Using sexualized language or imagery
- Personal attacks or insulting comments
- Public or private harassment
- Publishing others' private information without permission
- Other unethical or unprofessional behavior

### Enforcement

Violations of the code of conduct may result in:
- Warning
- Temporary suspension
- Permanent ban

Report violations to: conduct@junaikey.com

## Key Contribution Areas

### High Priority
- [ ] Performance optimization
- [ ] Bug fixes
- [ ] Documentation improvement
- [ ] Test coverage improvement

### Medium Priority
- [ ] New feature development
- [ ] UI/UX improvements
- [ ] Code refactoring
- [ ] Internationalization support

### Low Priority
- [ ] Experimental features
- [ ] Code comment supplementation
- [ ] Example projects
- [ ] Community tools

## Contribution Statistics

View your contribution statistics:
- [Contributor Leaderboard](https://github.com/DingJun1028/junaikey/graphs/contributors)
- [Personal Dashboard](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

Thanks to everyone who has contributed to JunAiKey!

[![Contributors](https://contrib.rocks/image?repo=DingJun1028/junaikey)](https://github.com/DingJun1028/junaikey/graphs/contributors)

---

*Looking forward to your contributions! Let's build a better JunAiKey together!* 🚀

*Last Updated: 2025-10-18*

# Release Process for Intent Navigator

## Pre-Release Checklist

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md` with release notes
- [ ] Run `npm test` to ensure all tests pass
- [ ] Run `npm run package` to create `.vsix` file
- [ ] Test the `.vsix` in VS Code debug mode
- [ ] Update README.md if needed

## Release Steps

1. **Prepare Release Branch**
   ```bash
   git checkout -b release/v1.2.0
   ```

2. **Update Version & Changelog**
   - Bump version in `package.json`
   - Add release notes to `CHANGELOG.md`
   - Commit changes

3. **Create Package**
   ```bash
   npm run package
   ```

4. **Test Package**
   - Install the generated `.vsix` file in VS Code
   - Test all features work correctly

5. **Publish to Marketplace**
   ```bash
   npx @vscode/vsce publish
   ```
   *Note: Requires publisher authentication*

6. **Tag Release**
   ```bash
   git tag v1.2.0
   git push origin v1.2.0
   ```

7. **Merge to Main**
   ```bash
   git checkout main
   git merge release/v1.2.0
   ```

## Current Release: v1.1.0 (Latest)

Intent Evolution features are live:
- ✅ Ctrl+Shift+E: Evolve intent with pivot options
- ✅ Ctrl+Shift+D: Declare ship target
- ✅ Enhanced Control Index: Counts all intentional acts

### Next Release: v1.2.0 (Unreleased)

### Planned Features
- [ ] Enhanced Control Index calculations
- [ ] Better error handling
- [ ] Performance optimizations

### Files to Update
- `package.json` - version number
- `CHANGELOG.md` - release notes
- `README.md` - if needed
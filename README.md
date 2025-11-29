# Personal Portfolio API
This react project will be integrated with flask rest api to handle portfolio for individual users

### Issues
* .env file commited accidentally

Steps Taken
* git rm --cached .env: Removed .env from the Git index while keeping the file locally
* git commit --amend --no-edit: Amended the last commit without changing the commit message

**Result**
The .env file is now:

✅ Removed from the commit history
✅ Still present locally (so your app still works)
✅ Properly ignored (since .env is in .gitignore)

**Verification**
You can verify the file is no longer tracked:

git status
The .env file should not appear in the "Changes to be committed" section.

**Why This Happened**
The .env file was accidentally committed even though it's in .gitignore. This can happen if:

The file was added to Git before being added to .gitignore
Using git add . which ignores .gitignore for already tracked files

**Prevention**
For future commits, .env will be properly ignored since it's in .gitignore. If you need to ensure no sensitive files are committed, you can run:

git status --ignored
This shows ignored files that might have been accidentally committed.
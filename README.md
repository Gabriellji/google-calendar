# google-calendar



https://github.com/Gabriellji/google-calendar/assets/55960149/f85f937d-4a48-4810-b333-75d3bda7d2d1

Requirements: Google account, Firebase Database
1. Clone repo
2. Fill up the `.env` (see .env.example file)
3. From the root of project in terminal run 
```
docker-compose up --build
``` 
5. Navigate `http://localhost:3006`
6. Autenticate with google account that potentially has some calendar events
7. Use logout to revoke all credentials 

CI/CD

1. Create a GitHub Actions with the main workflow + 3 branches: dev, stage, prod.
2. Write bash scripts that checks in what project (if many) the changes were made (based on the diff between the last successful workflow run and current state - SHAs for base and head).
Best idea if many apps would be monorepo with tools that allows to manage it. So all changes will be detected with no manual scripts. 
3. Fallback if bad commit object
4. Run lint/test and build.
If successful, it triggers the specific pipeline (or many) from AWS or any other cloud provider that are integrated with the code base from the gihub.
5. If successful -> save new base.
6. Merge to stage -> same process.
7. For prod could be the same process or using the option for manual production release using the workflow_dispatch event in GitHub Actions.


basic github action structure:
1. Pre-commit(lint verify for code, commit lint for message according to semver)
2. pre-push(unit-test)
3. On Pr open(e2e tests, commitlint)
4. On merge to branch(stage/dev/main) image build, and deployment



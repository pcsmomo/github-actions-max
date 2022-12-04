# GitHub Actions - The Complete Guide

GitHub Actions - The Complete Guide by Maximilian Schwarzmüller

## Folder structure

- example-prj-gui-vite
  - based on 04-events-deep-dive
  - 03-basics
  - 05-artifacts-outputs
  - 07-execution-flow
  - 09-custom-actions
    - actions/cached-deps : composite
    - actions/deploy-s3-javascript : javascript
      - when deploy, `node_modules` must be installed and included
    - actions/deploy-s3-docker : docker
- example-prj-server-node
  - based on 06-env-vars-secrets
  - 08-docker-containers

## Details

<details open>
  <summary>Click to Contract/Expend</summary>

## Section 3: GitHub Actions - Basic Building Blocks & Components

### 34. Key Components: Workflows, Jobs, Steps & More

1. Workflows
   - Attached to a GitHub repository
   - Contain one or more `Jobs`
   - Triggered upon `Events`
2. Jobs
   - Define a `Runner` (execution environment)
   - Contain one or more `Steps`
   - Run in parallel (default) or sequential
   - Can be conditional
3. Steps
   - Execute a `shell script` or an `Action`
   - Can use custom or third-party actions
   - Steps are executed in order
   - Can be conditional

### 36. Creating a First Workflow

1. Create a new repo `gh-first-action`
2. Actions tab -> Configure
3. write the first workflow

[Supported runners and hardware resources](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources)

### 37. Running the First Workflow

1. Commit the changes on the web
2. Actions -> First Workflow
3. Navigate to see the details

### 40. A New Workflow & The "push" Event

#### Event (Workflow Triggers)

- Repository-related
  - push
  - pull-request : (opened, closed, ...)
  - create
  - folk
  - issues
  - issue_comment
  - watch
  - discussion : (created, deleted, ...)
  - many more!
- Other
  - workflow_dispatch : manually trigger workflow
  - repository_dispatch : REST API request triggers workflow
  - schedule : Workflow is scheduled
  - workflow_call : Can be called by other workflows

[GitHub Actions Events](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)

### 41. Using Actions In Workflows

- Command("run")
  - A (typically simple) shell command that's defined by you
- Action
  - A (custom) application that performs a (typically complex) frequently repeated task
  - You can build your won Actions but you can also use official or community Actions

#### Github Actions `checkout`

- [GitHub Actions checkout][https://github.com/actions/checkout] - Created by GitHub team
- You can browse different actions (free), https://github.com/marketplace/actions/checkout
- Marketplace - Actions - https://github.com/marketplace?category=&query=&type=actions&verification=

### 42. Checking Out Code In Workflows

[actions/checkout@v3 - https://github.com/actions/checkout#usage](https://github.com/actions/checkout#usage)

### 43. Configuring Actions

1. https://github.com/actions/runner-images
   - find ubuntu-latest
   - or see here, https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-software
2. https://github.com/actions/runner-images/blob/main/images/linux/Ubuntu2004-Readme.md
   - check installed software
   - `Node 16.18.1`

> if node is not installed? \
> Add a step for it: https://github.com/actions/setup-node#usage
> in this course, add the step for practice as it's not harmful 🤣

### 46. Adding Multiple Jobs

\*Every job gets its own runner - its own virtual machine that's totally isolated from otehr machines and jobs

### 49. Expressions & Context Objects

```yml
# output.yml
run: echo "${{ toJson(github) }}"
```

To use metadata from GitHub

[Github Actions Contexts](https://docs.github.com/en/actions/learn-github-actions/contexts)

### 58. Using Activity Types

- Events
  - Activity types
    - pull_request
      - opened, closed, edited
      - default for `pull_request`: opened, synchronize, or reopened
      - https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request
  - Filters
    - push
      - Filter based on target branch
      - https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onpushbranchestagsbranches-ignoretags-ignore
        ```yml
        branches:
          - main # main
          - 'dev-*' # * doesn't count "/", e.g. dev-new, dev-this-is-new
          - 'feat/**' # ** includes "/" as well, e.g. feat/new, feat/new/button
        paths-ignore:
          - '.github/workflows/*' # the action will not trigger, as we changed this file
        ```

### 60. Special Behavior: Forks & Pull Request Events

- By default, Pull Request based on Forks do NOT trigger a workflow
- Reason: Everyone can forl & open pull requests
  - Malicious workflow runs & excess cost could be caused
- First-time contributors must be approved manually

### 61. Cancelling Workflows & Skipping Workflows

[Skipping workflow runs](https://docs.github.com/en/actions/managing-workflow-runs/skipping-workflow-runs)

- add any of the following strings to the commit message in a push, or the HEAD commit of a pull request:
  - [skip ci]
  - [ci skip]
  - [no ci]
  - [skip actions]
  - [actions skip]
  - [skip ci]
- Alternatively, you can end the commit message with two empty lines followed by either:
  - skip-checks:true
  - skip-checks: true

## Section 5: Job Artifacts & Outputs

### 65. Understanding Job Artifacts

- Job -> Example: Build app
- Output Asset(s) - Example: App binary, website files, build or dist etc.
  - download & use manually
    - Via GitHub UI or REST API
  - download & use in other jobs
    - Via Action

### 67. Uploading Job Artifacts

[GitHub Actions upload-artifact](https://github.com/actions/upload-artifact)

> And we can actually download the asset on the action page on the browser

### 68. Downloading Artifacts (Manually & Automatically)

[GitHub Actions download-artifact](https://github.com/actions/download-artifact)

### 69. Understanding Job Outputs

- Artifacts : Output files & folders
- Job Outputs : Simple values
  - e.g. hash values and so on

### 70. Job Outputs - An Example

```sh
# it displays the randomly hashed file name
find dist/assets/*js -type f -execdir echo 'script-file={}' ';'
# script-file=index.047b9b6b.js
```

[GitHub Actions Context : steps](https://docs.github.com/en/actions/learn-github-actions/contexts#steps-context)

- `steps.<step_id>.outputs.<output_name>`
  - `script-file: ${{ steps.publish.outputs.script-file }}`
- `run: find dist/assets/*js -type f -execdir echo 'script-file={}' >> $GITHUB_OUTPUT ';'`
  - old way: `run: find dist/assets/*js -type f -execdir echo '::set-output name=script-file::{}' ';'`

### 71. Using Job Outputs In Other Jobs

[GitHub Actions Context : needs](https://docs.github.com/en/actions/learn-github-actions/contexts#needs-context)

### 72. The Need For Dependency Caching

To remove repeated actions

### 73. Caching Dependencies in Practice

- [GitHub Actions cache](https://github.com/actions/cache)
  - and [the example for Node - npm](https://github.com/actions/cache/blob/main/examples.md#node---npm)

```sh
# after push

# Cache dependencies
Run actions/cache@v3
Cache not found for input keys: deps-node-modules-c5817646ecce628028344231f22da9f284ccc9cddba928e0f971156ee2b0b772

# Post Cache dependencies
Post job cleanup.
/usr/bin/tar --posix --use-compress-program zstdmt -cf cache.tzst --exclude cache.tzst -P -C /home/runner/work/gh-05-artifacts/gh-05-artifacts --files-from manifest.txt
Cache Size: ~16 MB (17095001 B)
Cache saved successfully
Cache saved with key: deps-node-modules-c5817646ecce628028344231f22da9f284ccc9cddba928e0f971156ee2b0b772
```

> it will still be cahced, next ci builds until `package-lock.json` file changes after updating or install npm packages

> Caching is not for `Artifacts` nor `Outputs`. It's for like dependencies to speed up the workflow.\
> Don't use caching for artifacts. Artifact is output from workflows which are results that we're interested in.

### 75. Module Summary

- Artifacts
  - Jobs often product assets that should be shared or analyzed
  - Example: Deployable website files, logs, binaries etc.
  - These assets are referred to as "Artifacts" or (Job Artifacts")
  - GitHub Actions provides Actions for uploading & downloading
- Outputs
  - Besides Artifacts, Steps can product and share simple values
  - These outputs are shared via `echo '{output-name}={output-value' >> $GITHUB_OUTPUT`
  - Jobs can pick up & share Step outputs via the `steps` context
  - Other Jobs can use Job outputs via the `needs` context
- Caching
  - Caching can help speed up repeated, slow Steps
  - Typical use-case: Caching dependencies
  - But only files & folder can be cached
  - The cache Action automatically stores & updates cache values (based on the cache key)
  - Important: Don't use caching for artifacts!

## Section 6: Using Environment Variables & Secrets

### 77. Project Setup & Understanding Environment Variables

[Playwright: E2E(End To End) testing tool for node](https://playwright.dev/)

### 81. Default Environment Variables

[GitHub Actions Environment variables](https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables)

### 82. Understanding & Using Secrets

1. Repo -> Settings -> Security -> Secrets -> Actions -> add New repository secret
2. MONGODB_USERNAME: ${{ secrets.MONGODB_USERNAME }}
3. secrets won't be printed or echoed (github action takes care of secrets)
   ```yml
   Run echo "MONGODB_USERNAME: ***"
   MONGODB_USERNAME: ***
   ```

### 83. Utilizing Repository Environments

We can set secrets in different environments we define (e.g. testing, build, etc. ). \
and it can be used in different jobs.

1. Repo -> Settings -> Code and automation -> Environments (not provided for private repo on free plan)
2. add `testing` environment and add secrets
   ```yml
   jobs:
     test:
       environment: testing
       runs-on: ubuntu-latest
   ```
3. Can set deployment branch on the environment, if it is set to `main`, \
   `test` job in `dev` branch will fail

## Section 7: Controlling Workflow & Job Execution

### 86. Understanding Conditional Steps & Jobs

- Jobs
  - Conditional execution via `if` field
- Steps
  - Conditional execution via `if` field
  - Ignore erros via `continue-on-error` field

### 89. Controlling Execution via "if"

- [GitHub Actions Context : steps](https://docs.github.com/en/actions/learn-github-actions/contexts#steps-context)
- [GitHub Actions Expression : operators](https://docs.github.com/en/actions/learn-github-actions/expressions#operators)

### 90. Working with Special Conditional Functions

[GitHub Actions Expression : Status check functions](https://docs.github.com/en/actions/learn-github-actions/expressions#status-check-functions)

- `failure()`
  - returns `true` when any previous Step or Job failed
- `success()`
  - returns `true` when none of the previous steps have failed
- `always()`
  - causes the step to always execute, event when cancelled
- `cancelled()`
  - returns `true` if the workflow has been cancelled

### 92. More "if" Examples

- [GitHub Actions cache](https://github.com/actions/cache)
- `cache-hit` - A boolean value to indicate an exact match was found for the key.

### 93. Ignoring Errors & Failures with "continue-on-error"

- `continue-on-error: true`
  - it continues `build` job even `test` job failed
- `if: failure() && steps.run-tests.outcome == 'failure'`
  - it doesn't go `build` job as `test` job failed

### 94. Understanding & Using Matrix Strategies

- [GitHib Actions Matrix](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)
- so the `matrix.tml` runs 6 builds!!!

### 95. Including & Excluding Values (Matrix Strategy)

- `include` or `exclude`
  - when we don't want to run all combinations
  - https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#expanding-or-adding-matrix-configurations

### 96. Saving Time & Code with Reusable Workflows

[GitHub Actions Events: workflow_call](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_call)

### 97. Adding Inputs to Reusable Workflows

- [GitHub Actions Context : inputs](https://docs.github.com/en/actions/learn-github-actions/contexts#inputs-context)

## Section 8: Jobs & Docker Containers

### 101. Module Introduction

- Containers - A Re-introduction
- Running Jobs in Containers
- Using Service Containers

### 105. Run Jobs In Containers

[GitHub Actions - Run job sin a container](https://docs.github.com/en/actions/using-jobs/running-jobs-in-a-container)

### 106. Service Containers - Theory

Service Container

- Example: Hosts a testing database
- Runs inside a container (hosted by the Runner)
- Job steps can communicate with service containers \
  (and the services exposed by them)

### 107. Adding Services (via Service Containers)

Since we could use the `service container` in the test job, \
We don't need to use container (no benefit for this scenario)

[GitHub Actions - Containerized services](https://docs.github.com/en/actions/using-containerized-services/about-service-containers)

## Section 9: Building & Using Custom Actions

### 111. Why Custom Actions?

- Simplify workflow steps
  - instead of writing multiple (possibly very complex) step definitions,\
    you can build and use a single custom action
  - multiple steps can be grouped into a single custom action
- No exsiting (community) action
  - existing, public actions might not solve the specific problem you have in your workflow

### 112. Understanding Different Types of Custom Actions

- JavaScript Actions
  - Execute a JavaScript file
  - Use JavaScript (NodeJS) + any packages of your choice
  - Pretty straightforward (if you know JavaScript)
- Docker Actions
  - Create a Dockerfile with your required configuration
  - Perform any task(s) of your choice with any language
  - Lots of flexibility but requires Docker knowledge
- Composit Actions
  - Combine multiple Workflow Steps in one single Action
  - Combine `run` (commands) and `uses` (Actions)
  - Allows for reusing shared Steps (without extra skils)

### 114. Creating Composite Actions

[GitHub Actions - composite action ](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action)

- no need `on`
- need to add `shell: bash` for command line

### 118. Custom JavaScript Actions - Getting Started

[GitHub Actions - javascript action](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#runs-for-javascript-actions)

### 120. Adding Basic JavaScript Logic

```sh
# 09-custom-actions/.github/actions/deploy-s3-javascript
npm init -y

npm install @actions/core @actions/github @actions/exec
```

> Actually, `@actions/core`, `@actions/github`, and `@actions/exec` are \
> included in the [`actions/toolkit`](https://github.com/actions/toolkit)

### 121. Creating a S3 Bucket (for a more advanced, custom Action)

- AWS -> Create bucket
  - bucket name: gha-custom-action-hosting
  - AWS Region: ap-southeast-2
  - Unckeck - Block all public access
    - Check that I acknowledge about it
- `gha-custom-action-hosting` bucket -> properties -> Static website hosting
  - enable
  - index document: index.html
- `gha-custom-action-hosting` bucket -> permissions -> Bucket policy [Edit]
  - click `Policy examples`
    - Granting read-only permission to an anonymous user
      ```json
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject", "s3:GetObjectVersion"],
            "Resource": ["arn:aws:s3:::DOC-EXAMPLE-BUCKET/*"]
          }
        ]
      }
      ```
    - replace `DOC-EXAMPLE-BUCKET` to my bucket name

### 123. Interacting with GitHub Actions Features

#### Upload files

1. Using AWS SDK
   - https://aws.amazon.com/developer/tools/
2. Via the code

```js
const github = require('@actions/github'); // this is for using the other context if needed
// github.context.
```

</details>

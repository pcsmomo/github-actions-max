# GitHub Actions - The Complete Guide

GitHub Actions - The Complete Guide by Maximilian Schwarzmüller

## Folder structure

-

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

</details>

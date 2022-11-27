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

</details>

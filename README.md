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

</details>

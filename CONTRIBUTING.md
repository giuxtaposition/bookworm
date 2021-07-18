## Setup the Project

The following steps will get you up and running to contribute to Bookworm:

1. Fork the repo (click the <kbd>Fork</kbd> button at the top right of
   [this page](https://github.com/giuxtaposition/bookworm))

2. Clone your fork locally

```sh
git clone https://github.com/<your_github_username>/bookworm.git
cd bookworm
```

1. Setup all the dependencies and packages by running `yarn install`.

### Commands

**`yarn start`**: runs the project in development mode.

**`yarn build`**: run build for all component packages.

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

If you are interested in the detailed specification you can visit https://www.conventionalcommits.org/

### Steps to make a Pull Request

1. Fork of the chakra-ui repository and clone your fork

2. Create a new branch out of the `main` branch. We follow the convention
   `[type/scope]`. For example `fix/user-avatar-bug` or `feat/books-recommendations`. `type`
   can be either  `fix`, `feat`, `build`, or any other conventional
   commit type. `scope` is just a short id that describes the scope of work.

3. Make and commit your changes following the
   [commit convention](https://github.com/chakra-ui/chakra-ui/blob/main/CONTRIBUTING.md#commit-convention).

## License

By contributing your code to the bookworm GitHub repository, you agree to
license your contribution under the MIT license.

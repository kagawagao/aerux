workflow "Test and build on push" {
  on = "push"
  resolves = ["Test and build"]
}

action "Install dependencies" {
  uses = "actions/npm@e7aaefe"
  args = "install"
}

action "Test and build" {
  uses = "actions/npm@e7aaefe"
  needs = ["Install dependencies"]
  args = "run build"
}

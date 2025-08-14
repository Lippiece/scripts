#!/usr/bin/env fish

if string match -r "###" "$(commit-and-tag-version --dry-run)"
    commit-and-tag-version -s
    or false
else
    true
end

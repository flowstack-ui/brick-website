# Content synchronization

Run `npm run content:sync` only from a workspace where `../package` is the reviewed Brick source checkout. The script:

1. Reads the 75 component-owner documentation folders.
2. Produces committed catalog and full-document records.
3. Records the package version and exact Git commit.
4. Regenerates `llms.txt` and `llms-full.txt`.

Review and commit every generated change. `npm run content:check` verifies the committed records against the installed package without requiring the sibling checkout.

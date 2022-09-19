# Module Two Assessment HTML Skeleton

While it does not need to look exactly the same, it should include the following:

- [ ] `body`

  - [ ] The page's background should be the color `lavender`.
  - [ ] All non-input text should be of the font `monospace`.

  - [ ] `header`

    - [ ] `img`: An image of the studio's logo should be in the header and should be the same height as the header. The image can be found in the `images/` folder
    - [ ] `h1`: `Ghibli Review App`
    - [ ] `header`: takes up about 75% of the page's width
      - [ ] The `header`'s background should be `skyblue`

  - [ ] `main`

    - [ ] `section`

      - [ ] `h2`: `Select a movie`
      - [ ] `select`: `id` of `titles`
      - [ ] `option` (blank, no value), remaining `option`s will be populated with the movie titles from the API

    - [ ] `section`
      - [ ] `h2`: `Add a review`
      - [ ] `form`
        - [ ] `label`, `for` = `review`: `Your review`
        - [ ] `input`, `id` = `review`: type text
        - [ ] `input`: type submit
    - [ ] `section`
      - [ ] `h2`: `Movie details`
      - [ ] `div`, `id` = `display-info`: starts empty, will be populated with `h3` and two `p` elements, when a movie is selected
    - [ ] `section`
      - [ ] `h2`: `People`
      - [ ] `ol`: starts empty, will be populated with `li` as people `names` are added
      - [ ] `button`, `id` = `show-people`, text `Show People`
    - [ ] `section`, `id` = `reviews`
      - [ ] `h2`: `Reviews`
      - [ ] `ul`: starts empty, will be populated with `li` as reviews are added
      - [ ] `button`, `id` = `reset-reviews`, text `Reset Reviews`

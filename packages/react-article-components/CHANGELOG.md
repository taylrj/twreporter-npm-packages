# CHANGELOG

## UNRELEASED

## RELEASE

### 1.0.9

- Upgrade dependency `@twreporter/react-components` version to v7.0.5

### 1.0.8

#### Styles Revised

- Update `article-page:LeadingBlock` styles
- Update `article-page:BodyBackground` styles

#### Self-defined PropTypes Modified

- Remove `isRequired` if prop could not be provided
- Add default props since `isRequired` is removed

#### UI Manager Updated

- Take `hero_image_size` into account when rendering separation line after leading

#### Miscellaneous

- Use `hero_image` as fallback for related:thumbnail

### 1.0.7

- Add `Slider`, `ImageDiff`, and `Audio` components for `Body`

### 1.0.6

#### Default Theme(article:v2:default) Support

- Provide `primary`, `secondary` and `base` colors for default theme
- Support `extend`, `normal`, `fullscreen` and `small` leading block with default theme

#### Photo Theme(article:v2:photo) Support

- Provide `primary`, `secondary` and `base` colors for photo theme
- Support `extend`, `normal`, `fullscreen` and `small` leading block with photo theme

#### UIManager

- Introduce `UIManager(src/managers/ui-manager.js)` to handle theme and layout

#### Code Refactoring

- Pass `className` prop to body:\${component}
- Refactor components/body/index.js: give body:${component} specified css by styled(body.${component})
- Shift left -10px due to border-(left|right) on articlePage

#### Bug fix

- Fix body:slideshow bug: description not rendered if current slide index is more than 6
- Fix body:centered-quote bug: `by` -> `quoteBy`
- Fix link of donation box(generated by SSR) does not contain utm query param
- Fix category link bug: category id -> category path segment
- Handle iframe wider than embedded container

#### Miscellaneous

- URL origin replacement: storage.googleapis.com -> www.twreporter.org
- body:slideshow updated: img tag -> img-with-placeholder
- src/utils/media-query -> @twreporter/core/lib/utils/media-query
- Render bookmark widget on aside:mobile

### 1.0.5

- Update dependencies
- Take shared `prop-types` from `@twreporter/core`

### 1.0.4

- Remove `state.fontLevel` of `article-page.js`
- Remove `fontSizeOffset` from aside:metadata

### 1.0.3

- Update `src/components/article-page.js`

  - Prop naming change: `defaultFontLevel` -> `fontLevel`
  - Add `onFontLevelChange` prop
  - fontLevel update: base -> small, large -> medium, xLarge -> large

- Handle line breaks
  - Update blockquote, paragraph, list, and annotation

### 1.0.2

- Fix missing props of BookmarkWidget
- Update dependencies

### 1.0.0

- Init the repo
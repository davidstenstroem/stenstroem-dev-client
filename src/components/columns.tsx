import * as React from 'react'
import classnames from 'classnames'

type columnWidth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 'three-quarters'
  | 'two-thirds'
  | 'half'
  | 'one-third'
  | 'one-quarter'
  | 'full'
  | 'four-fifths'
  | 'three-fifths'
  | 'two-fifths'
  | 'one-fifth'

interface ColumnsProps {
  isCentered?: boolean
  isMobile?: boolean
  isVCentered?: boolean
  isMultiline?: boolean
  children?: React.ReactChild[] | React.ReactChild
}

export const Columns: React.FunctionComponent<ColumnsProps> = ({
  isCentered,
  isMobile,
  children,
  isVCentered,
  isMultiline,
}: ColumnsProps): JSX.Element => (
  <div
    className={classnames(
      'columns',
      isCentered ? 'is-centered' : null,
      isMobile ? 'is-mobile' : null,
      isVCentered ? 'is-vcentered' : null,
      isMultiline ? 'is-multiline' : null
    )}
  >
    {children}
  </div>
)

interface ColumnProps {
  defaultWidth?: columnWidth
  mobileWidth?: columnWidth
  tabletWidth?: columnWidth
  desktopWidth?: columnWidth
  widescreenWidth?: columnWidth
  fullHDWidth?: columnWidth
  children?: React.ReactChild[] | React.ReactChild
}

export const Column: React.FunctionComponent<ColumnProps> = ({
  mobileWidth,
  tabletWidth,
  desktopWidth,
  widescreenWidth,
  fullHDWidth,
  defaultWidth,
  children,
}: ColumnProps): JSX.Element => {
  let classes: string[] = []
  if (mobileWidth) {
    classes.push(`is-${mobileWidth}-mobile`)
  }
  if (tabletWidth) {
    classes.push(`is-${tabletWidth}-tablet`)
  }
  if (desktopWidth) {
    classes.push(`is-${desktopWidth}-desktop`)
  }
  if (widescreenWidth) {
    classes.push(`is-${desktopWidth}-desktop`)
  }
  if (fullHDWidth) {
    classes.push(`is-${fullHDWidth}-fullhd`)
  }
  if (defaultWidth) {
    classes.push(`is-${defaultWidth}`)
  }

  return (
    <div className={classnames('column', classes.join(' '))}>{children}</div>
  )
}

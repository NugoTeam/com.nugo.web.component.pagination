import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Fonts.css'
import './NugoPagination.scss'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'
const PAGE_SIZE = 20

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }

  return range
}

class NugoPagination extends Component {
  constructor (props) {
    super(props)
    const { totalRecords = null, pageSize = PAGE_SIZE, pageNeighbours = 0 } = props

    this.pageSize = typeof pageSize === 'number' ? pageSize : PAGE_SIZE
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0

    // pageNeighbours can be: 0, 1 or 2
    this.pageNeighbours = typeof pageNeighbours === 'number'
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0

    this.state = { currentPage: 1, totalPages: Math.ceil(this.totalRecords / this.pageSize) }
  }

  componentDidUpdate (prevProps) {
    if (this.props.pageSize !== prevProps.pageSize) {
      this.setState({ totalPages: Math.ceil(this.totalRecords / this.props.pageSize) })
      // this.state.totalPages = Math.ceil(this.totalRecords / this.props.pageSize)
    }
  }

  gotoPage = page => {
    const { onPageChange = f => f } = this.props

    const currentPage = Math.max(0, Math.min(page, this.state.totalPages))

    const paginationData = {
      currentPage,
      totalPages: this.state.totalPages,
      pageSize: this.pageSize,
      totalRecords: this.totalRecords
    }

    this.setState({ currentPage }, () => onPageChange(paginationData))
  }

  handleClick = page => evt => {
    evt.preventDefault()
    this.gotoPage(page)
  }

  handleMoveLeft = evt => {
    evt.preventDefault()
    this.gotoPage(this.state.currentPage - (this.pageNeighbours * 2) - 1)
  }

  handleMoveRight = evt => {
    evt.preventDefault()
    this.gotoPage(this.state.currentPage + (this.pageNeighbours * 2) + 1)
  }

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  fetchPageNumbers () {
    const totalPages = this.state.totalPages
    const currentPage = this.state.currentPage
    const pageNeighbours = this.pageNeighbours

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (this.pageNeighbours * 2) + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)

      let pages = range(startPage, endPage)

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2
      const hasRightSpill = (totalPages - endPage) > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }

      return [1, ...pages, totalPages]
    }

    return range(1, totalPages)
  }

  render () {
    if (!this.totalRecords || this.state.totalPages === 1) return null

    const { currentPage } = this.state
    const pages = this.fetchPageNumbers()

    return (
      <nav aria-label="Countries Pagination">
        <ul className="nugoPagination">
          { pages.map((page, index) => {
            if (page === LEFT_PAGE) {
              return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Previous" onClick={this.handleMoveLeft}>
                    <span aria-hidden="true">
                      <i aria-hidden="true" className="caret left"></i>
                    </span>
                  </a>
                </li>
              )
            }

            if (page === RIGHT_PAGE) {
              return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Next" onClick={this.handleMoveRight}>
                    <span aria-hidden="true">
                      <i aria-hidden="true" className="caret right"></i>
                    </span>
                  </a>
                </li>
              )
            }

            return (
              <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
                <a className="page-link" href="#" onClick={ this.handleClick(page) }>{ page }</a>
              </li>
            )
          }) }

        </ul>
      </nav>
    )
  }
}

NugoPagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChange: PropTypes.func
}

export default NugoPagination

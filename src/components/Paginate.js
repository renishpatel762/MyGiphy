import React from 'react'
const Paginate = (props) => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <nav style={{ display: 'flex', flex: '10', position: 'fixed', bottom: '20vh' }}>
                <button style={{ flex: '2', marginLeft: '10vw', marginBottom: '3vh' }} className='pn-button btn btn-light btn-sm ' onClick={() => {
                    if (props.currentPage - 1 > 0) {
                        props.pageSelected(props.currentPage - 1)
                    }
                }}>Previous</button>
                <ul style={{ flex: '6' }} className="pagination pagination-sm justify-content-center border-0" >
                    {pageNumber.map(number => {
                        let classes = "page-item ";
                        if (number === props.currentPage) {
                            classes += "active";
                        }

                        return (
                            <li key={number} className={classes}>
                                <a
                                    onClick={() => props.pageSelected(number)}
                                    href="#"
                                    className="page-link"
                                >
                                    {number}
                                </a>
                            </li>
                        );
                    })}
                </ul>
                <button style={{ flex: '2', marginRight: '10vw', marginBottom: '3vh' }} className='pn-button btn btn-light btn-sm ' onClick={() => {
                    if (props.currentPage + 1 <= pageNumber.length) {
                        props.pageSelected(props.currentPage + 1)
                    }
                }}>Next</button>
            </nav>
        </div>
    )
}

export default Paginate
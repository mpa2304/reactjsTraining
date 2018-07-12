import React from 'react';

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
    render() {
        let rows = [];
        let lastCategory = null;

        const filteredProducts = this.props.products.filter((p) => p.name.indexOf(this.props.filterText) > -1);

        filteredProducts.forEach((product) => {
            if (this.props.inStockOnly && !product.stocked) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                    category={product.category}
                    key={product.category} />
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name} />
            );
            lastCategory = product.category;
        });

        const noProducts = 
            <tr>
                <th colSpan="2">
                No products found
                </th>
            </tr>;

        return (
            <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows.length > 0 ? rows : noProducts }</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    handleTextInput(e) {
        this.props.handleTextInput(e.target.value);
    }

    handleInStockOnly(e) {
        this.props.handleInStockOnly(e.target.checked);
    }

    render() {
        return (
            <form>
            <input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.handleTextInput.bind(this)} />
            <p>
                <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleInStockOnly.bind(this)} />
                {' '}
                Only show products in stock
            </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleInStockOnly = this.handleInStockOnly.bind(this);
        this.handleTextInput = this.handleTextInput.bind(this);
    }

    handleInStockOnly(inStockOnly) {
        this.setState({
            inStockOnly:  inStockOnly
        });
    }

    handleTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    render() {
        return (
            <div className="productsTable">
                <SearchBar 
                    filterText={this.state.filterText} 
                    inStockOnly={this.state.inStockOnly} 
                    handleInStockOnly={this.handleInStockOnly}  
                    handleTextInput={this.handleTextInput}
                />
                <ProductTable 
                    products={this.props.products} 
                    filterText={this.state.filterText} 
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

export default FilterableProductTable;
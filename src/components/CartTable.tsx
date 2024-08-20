import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import { useCart } from "../hooks/useCart";
import { ProductType } from "../services/products";

type CartEntry = {
  product: ProductType;
  quantity: number;
};

const CartTableRow = (props: { entry: CartEntry }) => {
  const { addProduct, removeProduct } = useCart();

  return (
    <tr>
      <td>
        <Row className="align-items-center gap-1">
          <Col xs={4} md={2} lg={1} className="p-2">
            <Image
              src={props.entry.product.imageUrl}
              alt={props.entry.product.name}
              height={200}
              width={300}
              className="rounded shadow-sm"
              style={{ objectFit: "cover" }}
            />
          </Col>
          <Col xs={8} md={10} lg={11} className="p-2">
            <h6 className="mb-0 text-truncate">{props.entry.product.name}</h6>
          </Col>
        </Row>
      </td>
      <td className="text-center">R$ {props.entry.product.price.toFixed(2)}</td>
      <td className="text-center">{props.entry.quantity}</td>
      <td className="text-center">
        R$ {(props.entry.product.price * props.entry.quantity).toFixed(2)}
      </td>
      <td className="text-center">
        <Button
          color="primary"
          size="sm"
          className="me-2"
          onClick={() => addProduct(props.entry.product)}
        >
          +
        </Button>
        <Button
          color="danger"
          size="sm"
          onClick={() => removeProduct(props.entry.product.id)}
        >
          –
        </Button>
      </td>
    </tr>
  );
};

export default function CartTable() {
  const [cartEntries, setCartEntries] = useState<CartEntry[]>([]);
  const { cart } = useCart();

  useEffect(() => {
    const entriesList = cart.reduce((list, product) => {
      const entryIndex = list.findIndex(
        (entry) => entry.product.id === product.id
      );

      if (entryIndex === -1) {
        return [
          ...list,
          {
            product,
            quantity: 1,
          },
        ];
      }

      list[entryIndex].quantity++;
      return list;
    }, [] as CartEntry[]);

    entriesList.sort((a, b) => a.product.id - b.product.id);
    setCartEntries(entriesList);
  }, [cart]);

  return (
    <Table
      responsive
      bordered
      hover
      className="align-middle shadow-sm"
      style={{ minWidth: "32rem" }}
    >
      <thead className="table-dark">
        <tr>
          <th>Produto</th>
          <th className="text-center">Preço</th>
          <th className="text-center">Qtd.</th>
          <th className="text-center">Total</th>
          <th className="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {cartEntries.map((entry) => (
          <CartTableRow key={entry.product.id} entry={entry} />
        ))}
      </tbody>
    </Table>
  );
}

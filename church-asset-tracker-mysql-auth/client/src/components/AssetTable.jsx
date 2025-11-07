export default function AssetTable({ assets }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
          <th>Name</th>
          <th>Manufacturer</th>
          <th>Model</th>
          <th>Category</th>
          <th>Location</th>
          <th>Status</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((a) => (
          <tr key={a.id} style={{ borderBottom: '1px solid #eee' }}>
            <td>{a.name}</td>
            <td>{a.manufacturer}</td>
            <td>{a.model}</td>
            <td>{a.category}</td>
            <td>{a.location}</td>
            <td>{a.status}</td>
            <td>{a.quantity}</td>
            <td>{a.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const ProductQueries = {
  GetProducts: `
    SELECT * FROM bsale_test.product
    `,
  GetProductsByCategory: `
  SELECT * from bsale_test.product WHERE category = ?;
  ;
    `,
  GetProductsByMatch: `
  SELECT * from bsale_test.product WHERE name LIKE CONCAT('%',?,'%');
    `,
  GetProductById: `
    SELECT
        *   
    FROM bsale_test.product
    WHERE
      id = ?
    `,

  AddProduct: `
    INSERT INTO bsale_test.product (
    name,
    url_image,
    price,
    discount,
    category)
      VALUES (?, ?, ?,?,?);
    `,

  UpdateProductById: `
    UPDATE teams_system.teams
    SET name = ?,
        league = ?
    WHERE
      id = ?
    `,

  DeleteProductById: `
    UPDATE teams_system.teams
    SET isActive = false
    WHERE
      id = ?
    `,
};

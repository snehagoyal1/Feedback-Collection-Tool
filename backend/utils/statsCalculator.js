module.exports = (feedbacks) => {
  const total = feedbacks.length;
  const avgRating = (
    feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / total
  ).toFixed(2);

  const productStats = {};
  feedbacks.forEach((fb) => {
    if (!productStats[fb.product]) productStats[fb.product] = { count: 0, sum: 0 };
    productStats[fb.product].count++;
    productStats[fb.product].sum += fb.rating;
  });

  const popularity = Object.entries(productStats).map(([product, val]) => ({
    product,
    avgRating: (val.sum / val.count).toFixed(2),
    total: val.count,
  }));

  return { total, avgRating, popularity };
};

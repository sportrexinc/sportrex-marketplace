import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Item {
  token_hash: string;
  name: string;
  description: string;
  image: string;
  // other properties...
}

const FavoriteButtonCollection = ({ item }: { item: any }) => {
  const [liked, setLiked] = useState(false);

  // Check if the item is already in favorites when component mounts
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoritesCollection") || "[]");
    const isFavorite = favorites.some(
      (favItem: any) => favItem?.token_hash === item?.token_hash
    );
    setLiked(isFavorite);
  }, [item?.token_hash]);

  // Toggle like status and update localStorage
  const handleLikeClick = () => {
    const favorites = JSON.parse(
      localStorage.getItem("favoritesCollection") || "[]"
    );

    if (liked) {
      // Remove item from favorites
      const updatedFavorites = favorites.filter(
        (favItem: any) => favItem?.token_hash !== item?.token_hash
      );
      localStorage.setItem(
        "favoritesCollection",
        JSON.stringify(updatedFavorites)
      );
      setLiked(false);
    } else {
      // Add item to favorites
      favorites.push(item);
      localStorage.setItem("favoritesCollection", JSON.stringify(favorites));
      setLiked(true);
    }
  };

  return (
    <>
      {liked ? (
        <AiFillHeart
          className="text-[24px] text-yellow"
          onClick={handleLikeClick}
        />
      ) : (
        <AiOutlineHeart
          className="text-[24px] text-grey-800"
          onClick={handleLikeClick}
        />
      )}
    </>
  );
};

export default FavoriteButtonCollection;

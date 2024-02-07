import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/auth';
import { useUserData } from '../../providers/userData';

function TagsInput({ resTags, setResTags, isEditable }) {
  const [tags, setTags] = useState(resTags);
  const [inputValue, setInputValue] = useState('');
  const auth = useAuth()
  const userData = useUserData()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      for (let index = 0; index < tags.length; index++) {
        const element = tags[index];
        if (element == inputValue) {
          setInputValue('');
          return
        }
      }
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      //have to remove
      setResTags(newTags)
      setInputValue('');
    }
  };

  const handleRemoveTag = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags)
    setResTags(newTags)
  };
  useEffect(() => {
    if (auth.user._id)
      // setTags(auth.user.skills)
      return () => {
        // console.log("test")
      };
  }, [])
  return (
    <div className="flex flex-col-reverse gap-2 dark:bg-color-11">
      <div className="flex gap-2 dark:bg-color-11  flex-wrap h-auto ">
        {tags.map((tag) => (
          <span key={tag} className="rounded-2xl dark:bg-color-11 dark:text-white dark:border border-[#4f6da877] border-2 bg-color-3
           text-base text-color-11 px-2 py-1 flex items-center gap-2" >
            {tag}
            {
              isEditable
              &&
              <i
                className="fa-solid fa-xmark text-color-13 cursor-pointer" onClick={() => handleRemoveTag(tag)}

              ></i>
            }
          </span>
        ))}
      </div>
      {
        isEditable
        &&
        <input
          className="  rounded-xl w-full  p-2  dark:bg-color-11 dark:border transition-all ease-in-out bg-color-3 border-[#4f6da877] focus:ring-[#6868ea]  duration-500 focus:border-color-17 border-[2px] outline-none "
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add skills"
          disabled={!isEditable}
        />
      }

    </div>
  );
}

export default TagsInput;

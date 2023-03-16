import { ChangeEvent, useState } from 'react';
import { CarbonCloudUpload } from './Icons';
import { useNavigate } from 'react-router-dom';
import { MdiDelete } from './Icons';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { aesthetics } from '../utils/aesthetics';
import { client } from '../client';
import InfinityLoading from './InfinityLoading';
import { useEffect } from 'react';
import { SanityDocumentStub, SanityImageAssetDocument } from '@sanity/client';
import { Aesthetic, Post } from '../ts/interfaces';
import { useAppDispatch } from '../app/hooks';
import { addNewPost } from '../features/posts/postsSlice';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/user/userSlice';
import { getTheme } from '../features/ui/uiSlice';

export const CreatePost: React.FC = () => {
  const [autocompleteStyles, setAutocompleteStyles] = useState({
    boxShadow: undefined,
    backgroundColor: 'white',
    color: "black",
    hoverBackgroundColor: "#eee"
  });
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [externalLink, setExternalLink] = useState<string>('');
  const [fields, setFields] = useState(false);
  const [aesthetic, setAesthetic] = useState<string | null>(null);
  const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument | null>();
  const [wrongImageType, setWrongImageType] = useState(false);

  const user = useAppSelector(selectUser);
  const theme = useAppSelector(getTheme);

  const navigate = useNavigate();
  const dispatch = useAppDispatch()



  const uploadImage = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const selectedFile = target.files![0];
    // uploading asset to sanity
    if (selectedFile && (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff' || selectedFile.type === 'image/webp')) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePost = async () => {
    if (!(title && imageAsset?._id && aesthetic)) {
      setFields(true);
      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
      return;
    }

    try {
      const doc: SanityDocumentStub<Post> = {
        _type: 'post',
        title,
        about,
        externalLink: externalLink !== '' ? externalLink : undefined,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        aesthetic: aesthetic,
      };
      let res = await dispatch(addNewPost(doc)).unwrap()
      navigate(`/post-details/${res._id}`);
    } catch (err) {
      console.error('Failed to save the post: ', err)
    }

  };


  const handleOnSelect = (item: Aesthetic) => {
    setAesthetic(item.name)
  };

  const handleOnClear = () => {
    setAesthetic(null)
  };


  useEffect(() => {
    if (theme === 'dark') {
      setAutocompleteStyles((prevautocompleteStyles) => {
        return {
          ...prevautocompleteStyles,
          backgroundColor: '#202325',
          color: "white",
          hoverBackgroundColor: "black"
        }
      });
    } else {
      setAutocompleteStyles((prevautocompleteStyles) => {
        return {
          ...prevautocompleteStyles,
          backgroundColor: 'white',
          color: "black",
          hoverBackgroundColor: "#eee"
        }
      });
    }
  }, [theme])



  return (
    <section aria-label='Create Post' className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white dark:bg-mainDarkColor dark:text-white lg:p-5 p-3 lg:w-4/5  w-full rounded-xl">
        <div  className="bg-secondaryColor dark:bg-zinc-800  p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && (
              <InfinityLoading />
            )}
            {
              wrongImageType && (
                <h3 className='text-red-500'>Wrong file type.</h3>
              )
            }
            {!imageAsset ? (
              <label aria-label='upload img'>
                <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                  <div className="flex flex-col justify-center items-center dark:text-white">
                    <p className="font-bold text-2xl">
                      <CarbonCloudUpload />
                    </p>
                    <h1 className="text-lg ">Click to upload</h1>
                  </div>

                  <h3 className="mt-32 text-gray-400">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, WEBP, GIF or TIFF less than 20MB
                  </h3>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white dark:text-black text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdiDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <h2 className=" font-semibold text:lg sm:text-xl">Tittle <span className='text-red-500'>*</span></h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold dark:border-orange-200  border-b-2 dark:bg-secondaryDarkColor border-gray-200 p-2 rounded-xl"
          />
          <div className="flex flex-col gap-1">
            <div>
              <h2 className="mb-2 font-semibold text:lg sm:text-xl">Choose aesthetic <span className='text-red-500'>*</span></h2>
              <label aria-label='select aesthetic from list' className='mb-2 w-4/5 '>
                <ReactSearchAutocomplete
                  onSelect={handleOnSelect}
                  onClear={handleOnClear}
                  items={aesthetics}
                  styling={autocompleteStyles}
                  autoFocus
                                  />
              </label>
            </div>
            <h2 className="mb-2 mt-2 font-semibold text:lg sm:text-xl">About</h2>
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell everyone what your Post is about"
              className="outline-none text-base sm:text-lg border-b-2 dark:bg-secondaryDarkColor  dark:border-orange-200  rounded-xl border-gray-200 p-2"
            />
            <h2 className="mb-2 mt-2 font-semibold text:lg sm:text-xl">Link</h2>
            <input
              type="url"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              placeholder="Add an external url"
              className="outline-none text-base sm:text-lg border-b-2 dark:border-orange-200 rounded-xl dark:bg-secondaryDarkColor border-gray-200 p-2"
            />
            <div className="flex justify-end items-end mt-5 gap-5">
              {fields && (
                <p className="text-red-500  text-xl transition-all duration-150 ease-in ">Please fill all the required * fields</p>
              )}
              <button
                type="button"
                onClick={savePost}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Share
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CreatePost
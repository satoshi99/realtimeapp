import { format } from 'date-fns'
import Image from 'next/image'
import React, { FC } from 'react'
import { useDownloadUrl } from '../hooks/useDownloadUrl'
import { useMutateProfile } from '../hooks/useMutateProfile'
import { useQueryProfile } from '../hooks/useQueryProfile'
import { useUploadAvatarImg } from '../hooks/useUploadAvatarImg'
import useStore from '../store'

export const UserProfile: FC = () => {
  const session = useStore((state) => state.session)
  const editedProfile = useStore((state) => state.editedProfile)
  const update = useStore((state) => state.updateEditedProfile)
  const { data: profile } = useQueryProfile()
  const { updateProfileMutation } = useMutateProfile()
  const { uploadAvatarImgMutation } = useUploadAvatarImg()
  const { fullUrl: avatarUrl, isLoading } = useDownloadUrl(
    editedProfile.avatar_url,
    'avatars'
  )
  const updateProfile = () => {
    updateProfileMutation.mutate({
      id: session?.user?.id,
      username: editedProfile.username,
      favorites: editedProfile.favorites,
      avatar_url: editedProfile.avatar_url,
    })
  }

  return (
    <>
      <p className="mb-4">{profile?.username} Profile</p>
      <p>time stamp</p>
      <ul>
        {profile?.created_at && (
          <li className="my-1 text-sm">
            CREATED :{' '}
            {format(new Date(profile.created_at), 'yyyy-MM-dd HH:mm:ss')}
          </li>
        )}
        {profile?.updated_at && (
          <li className="my-1 text-sm">
            UPDATED :{' '}
            {format(new Date(profile.updated_at), 'yyyy-MM-dd HH:mm:ss')}
          </li>
        )}
      </ul>
      <p className="mt-4">Edite username</p>
      <input
        className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        type="text"
        placeholder="Username"
        value={editedProfile.username || ''}
        onChange={(e) => update({ ...editedProfile, username: e.target.value })}
      />
      <p>Edite favorites</p>
      <input
        className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        type="text"
        placeholder="Favorites"
        value={editedProfile.favorites || ''}
        onChange={(e) =>
          update({ ...editedProfile, favorites: e.target.value })
        }
      />
      <button
        className={`my-5 rounded ${
          updateProfileMutation.isLoading || !editedProfile.username
            ? 'bg-gray-400'
            : 'bg-indigo-600'
        } px-3 py-2 text-sm font-medium text-white`}
        type="button"
        onClick={updateProfile}
        disabled={updateProfileMutation.isLoading || !editedProfile.username}
      >
        {updateProfileMutation.isLoading ? 'Loading...' : 'Update'}
      </button>
      {avatarUrl && (
        <Image src={avatarUrl} alt="Avatar" width={150} height={150} />
      )}
      {isLoading && <p>Loading...</p>}
      <div className="mt-5">
        <label htmlFor="avatar">
          <div className="cursor-pointer bg-orange-300 p-5">
            Upload Avatar Image
          </div>
        </label>
        <input
          className="hidden"
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => uploadAvatarImgMutation.mutate(e)}
        />
      </div>
    </>
  )
}

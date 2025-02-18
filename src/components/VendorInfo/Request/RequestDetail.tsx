"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

type RequestStatus = "pending" | "approved" | "rejected"
type StoreType = "Counter" | "Shelve" | "Shop"

interface VendorRequest {
  id: string
  name: string
  email: string
  category: string
  status: RequestStatus
  createdAt: string
  description?: string
  website?: string
  phoneNumber?: string
  avatar: string
  logo: string
  country: string
  address: string
  storeName: string
  storeType: StoreType
}

const RequestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [request, setRequest] = useState<VendorRequest | null>(null)

  useEffect(() => {
    // In a real application, you would fetch the data from an API
    // For this example, we'll use mock data
    const mockRequest: VendorRequest = {
      id: id || "",
      name: "John Doe",
      email: "john@example.com",
      category: "Electronics",
      status: "pending",
      createdAt: new Date().toISOString(),
      description: "We specialize in high-quality electronic gadgets and accessories.",
      website: "https://johndoeelectronics.com",
      phoneNumber: "+1 (555) 123-4567",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      logo: "https://logo.clearbit.com/apple.com",
      country: "United States",
      address: "123 Tech Street, Silicon Valley, CA 94000",
      storeName: "JD Electronics",
      storeType: "Counter", // Default store type
    }
    setRequest(mockRequest)
  }, [id])

  const handleApprove = () => {
    if (request) {
      setRequest({ ...request, status: "approved" })
    }
  }

  const handleReject = () => {
    if (request) {
      setRequest({ ...request, status: "rejected" })
    }
  }

  const handleReserve = () => {
    if (request) {
      setRequest({ ...request, status: "pending" })
    }
  }

  const handleStoreTypeChange = (newType: StoreType) => {
    if (request) {
      setRequest({ ...request, storeType: newType })
    }
  }

  if (!request) {
    return <div className="container mx-auto p-4">Loading...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4 max-w-4xl"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="mb-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded text-sm"
      >
        Back to List
      </motion.button>
      <div className="bg-white shadow-md rounded-lg p-4"> {/* Changed p-6 to p-4 */}
        <div className="flex items-center mb-2">
          <img
            src={request.avatar || "/placeholder.svg"}
            alt={`${request.name}'s avatar`}
            className="w-12 h-12 rounded-full mr-2"
          />
          <div>
            <h1 className="text-xl font-bold">{request.name}</h1> {/* Changed text-2xl to text-xl */}
            <p className="text-gray-600 text-xs">{request.storeName}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm"> {/* Changed gap-6 to gap-4 */}
          <div>
            <h2 className="text-lg font-semibold mb-1">Vendor Information</h2> {/* Changed text-xl to text-lg and mb-2 to mb-1 */}
            <p>
              <strong>Email:</strong> {request.email}
            </p>
            <p>
              <strong>Phone:</strong> {request.phoneNumber}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={request.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {request.website}
              </a>
            </p>
            <p>
              <strong>Category:</strong> {request.category}
            </p>
            <div className="mt-1">
              <strong>Store Type:</strong>
              <div className="mt-1 flex space-x-1">
                {(["Counter", "Shelve", "Shop"] as StoreType[]).map((type) => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStoreTypeChange(type)}
                    className={`py-0.5 px-2 rounded-full text-xs font-medium ${
                      request.storeType === type
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Store Details</h2> {/* Changed text-xl to text-lg and mb-2 to mb-1 */}
            <p>
              <strong>Country:</strong> {request.country}
            </p>
            <p>
              <strong>Address:</strong> {request.address}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  request.status === "approved"
                    ? "text-green-600"
                    : request.status === "rejected"
                      ? "text-red-600"
                      : "text-blue-600"
                }`}
              >
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </p>
            <p>
              <strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-2">
          <h2 className="text-lg font-semibold mb-1">Store Logo</h2>
          <img
            src={request.logo || "/placeholder.svg"}
            alt={`${request.storeName} logo`}
            className="w-16 h-16 object-contain border border-gray-200 rounded-lg"
          />
        </div>
        <div className="mt-2">
          <h2 className="text-lg font-semibold mb-1">Description</h2>
          <p className="text-xs text-gray-700">{request.description}</p>
        </div>
        <div className="mt-2 flex space-x-2"> {/*mt-6 changed to mt-4 */}
          {request.status === "pending" && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleApprove}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-xs\" 
              >
                Approve
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReject}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs" 
              >
                Reject
              </motion.button>
            </>
          )}
          {(request.status === "approved" || request.status === "rejected") && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReserve}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs" 
            >
              Reserve
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default RequestDetailPage


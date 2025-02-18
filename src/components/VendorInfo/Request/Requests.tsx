"use client"

import type React from "react"
import { useState, useMemo } from "react"
// import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

type RequestStatus = "pending" | "approved" | "rejected"

interface VendorRequest {
  id: string
  name: string
  email: string
  category: string
  status: RequestStatus
  createdAt: string
}

const initialRequests: VendorRequest[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    category: "Electronics",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    category: "Fashion",
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    category: "Home Decor",
    status: "approved",
    createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    category: "Beauty",
    status: "rejected",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  // Add more sample data to demonstrate pagination
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 5}`,
    name: `Vendor ${i + 5}`,
    email: `vendor${i + 5}@example.com`,
    category: ["Electronics", "Fashion", "Home Decor", "Beauty"][Math.floor(Math.random() * 4)],
    status: ["pending", "approved", "rejected"][Math.floor(Math.random() * 3)] as RequestStatus,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  })),
]

const RequestPage: React.FC = () => {
  const [requests, setRequests] = useState<VendorRequest[]>(initialRequests)
  const [filter, setFilter] = useState<RequestStatus | "all">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  // const navigate = useNavigate()

  const handleApprove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: "approved" } : req)))
  }

  const handleReject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: "rejected" } : req)))
  }

  const handleReserve = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setRequests(
      requests.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "pending",
            }
          : req,
      ),
    )
  }

  // const handleRowClick = () => {
  //   navigate(`/request-detail/${id}`)
  // }
  // const handleRowClick = (id: string) => {
  //   navigate(`/request-detail/${id}`)
  // }

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesFilter = filter === "all" || req.status === filter
      const matchesSearch =
        req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.category.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [requests, filter, searchTerm])

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Vendor Requests</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <motion.select
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-[180px] p-2 border border-gray-300 rounded-md"
          onChange={(e) => {
            setFilter(e.target.value as RequestStatus | "all")
            setCurrentPage(1)
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </motion.select>
        <motion.input
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="text"
          placeholder="Search vendors..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="w-full sm:w-auto p-2 border border-gray-300 rounded-md"
        />
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md rounded-lg overflow-hidden"
      >
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence initial={false}>
              {paginatedRequests.map((request) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  // onClick={() => handleRowClick(request.id)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{request.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : request.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </motion.span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {request.status === "pending" && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => handleApprove(request.id, e)}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs"
                          >
                            Approve
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => handleReject(request.id, e)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
                          >
                            Reject
                          </motion.button>
                        </>
                      )}
                      {(request.status === "approved" || request.status === "rejected") && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => handleReserve(request.id, e)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-xs"
                        >
                          Reserve
                        </motion.button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>
      <div className="mt-4 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </motion.button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <motion.button
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                page === currentPage ? "text-indigo-600 bg-indigo-50" : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </motion.button>
        </nav>
      </div>
    </motion.div>
  )
}

export default RequestPage


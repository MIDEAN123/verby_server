import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: "Not Specified" },
    avatar: {
      url: {
        type: String,
        default:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAflBMVEX///9pu8lqvMgwmeLj7/RZsNAymuAtl9s2m97///1irOD2+/wml+DR5/NsvcdjucfK4vFwtORgts9jt8xFoN5WrNKeyugPkdzu9/i/3e1Rpt/q9Pmr0epNqdlBotuu2N98w8+Mx9Ki0dq63OPX7O/K4+aPxOZnsdyy1ul8uuNgZk3xAAAEEUlEQVRoge2YbZ+qLBDGRQqfxszUsGzNnvbufP8veIC0FBB0t9+533S92i38dzkMA4zjfPTRRx/9vyqrxaIqg3djo/U2zT0Q8vJ0u47eRa4OIVAA/BSwf8ND9QZ0nAquX38Vyw3TsviqfYwJQBr/Chw46z1loLrI3JX71MrNippgQvfrX8CrkKH9Ilu5iCsREn+6q6wgGNPwZ8EJnGDL0PnS7cjN6Xw8nk8tnvGXOQa6ZQPn08uQElKgFt1cOo/RsaUj1y0IoWE527YTe0DqrENf+99eOzpysxqDN3tid8BsP9AouTi9Vw8Cp0leeGYedvPYdxaSTce+yd/eLuemw682Pqb3OXHfUeJno+zHDzwjn/mETvYeODH02OeRYU86YnSIp3ovvRcbJaPJcH55J8SbmDNBCM94jxtnHl6zusEQTsv3LeAuTxj8Oj7w1MsZDNspviuK6ycbJYbiennCkVtjOqESBCHG6KXGMPS1mJgICe3wdT8oppD3gy4CQ+01ck/ynh++OEcV9Z2jnOxt7JjipduD61dQC++z3SWmtiKTYr/HNibLEI5WPqRmdjWI+Cw4T0dzwhyAZGgqvBzEHGUEDkZ4iOvVT+Es143ZGElRMU/oVYKzuESGErCmOBvAkakelY0UF3Oqb8EfGjdFRY2LbywwKQxDjiyFbmh9VRuTMcdfA+eNpYyeBnD3C+fjYwNPmk9kNu408ox642NLMlj7pm1IKJJivsRk/AG2PjdDuKluDQq6gLMNaTE6eCHDzdalZJkAH45HzThdTvPZzk373FliW+DKhBoDg2SZJ1RNxdE5DZyFbNySisoiElEfGatEhS0iYlhE6vJHo/VFThVkXf5y4XpIM6WBxjhC5sKlllxuvdHQbxp2RowlV9ksHnQ1Y64atm2z4Nuc+pQm7Lqg2LY5ZYNu4YpzHdy6QctHizH4UYXzLLecRVPiK8moyZeLBu5jy6FIPs491CjD1Amdcpxz9jhXKsBJGaVZQjm2HkR5qstR1x1eTnK5nXSEdkJCJHajSd4ykejEkodC7NpC6v4hGukPXdHAu1uTKdcWXmBI0WVMkhxHN4vjy/xq4oVLXBXbDSlJTqPooLfPtVfFSWKXXLFOpWaFRjfRYph1yWXXc+xnIthWOwzfXs8nizcWzhPf83qa01jgfncU+1PMBIFT5XgOm2sHmJprXGsj9vDcZg5/CCCNHFvYvylvQ81uoZUhABzMfdU4h/kNNKdt/QHk90BnPuAfxSkVrb+fqQoZ3vte6J4v73v25Q+blo4wvOYECL/Xw3dfHFLCXP+q3crFG8W8sV3/932473b3w/bPXjS7vV82ih/R5i1uAAI9Ue89LW6hR3Ne8Ml7m/NOly7lgqkcfPTRRx999O/1F5pNQozFC7VYAAAAAElFTkSuQmCC",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

const UserModel = mongoose.models.user || mongoose.model("user", User);

export default UserModel;
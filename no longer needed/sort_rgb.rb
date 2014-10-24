require_relative './miro'

def sort_rgb(ary)

  r = ary[0]
  g = ary[1]
  b = ary[2]

  #pink
  if (204..255).member?(r)
    if (0..153).member?(g)
      if (0..153).member?(b)
        return "red"
      end
    end
  end

  if (204..255).member?(r)
    if (102..204).member?(g)
      if(0..153).member?(b)
        return "orange"
      end
    end
  end

  if (102..255).member?(r)
    if (102..255).member?(g)
      if(0..153).member?(b)
        return "yellow"
      end
    end
  end
  if (51..204).member?(r)
    if (102..255).member?(g)
      if(0..153).member?(b)
        return "green" #yellow green
      end
    end
  end

  if (0..153).member?(r)
    if (102..255).member?(g)
      if(0..153).member?(b)
        return "green2" # normal green
      end
    end
  end

  if (0..1).member?(r) ####
    if (102..255).member?(g)
      if(51..128).member?(b)
        return "green3" #slightly bluer green
      end
    end
  end

  if (51..153).member?(r)
    if (254..255).member?(g) #####
      if(153..204).member?(b)
        return "green4" # we'll make this green too
      end
    end
  end

  if (0..153).member?(r)
    if (102..255).member?(g)
      if(102..255).member?(b)
        return "cyan"
      end
    end
  end

  if (0..153).member?(r)
    if (51..204).member?(g)
      if(102..255).member?(b)
        return "blue" # normal blue
      end
    end
  end

  if (0..153).member?(r)
    if (0..153).member?(g)
      if(102..255).member?(b)
        return "blue2" #indigo
      end
    end
  end

  if (51..204).member?(r)
    if (0..153).member?(g)
      if(102..255).member?(b)
        return "purple" #violet
      end
    end
  end

  if (102..255).member?(r)
    if (0..153).member?(g)
      if(102..255).member?(b)
        return "purple2" 
      end
    end
  end

  if (102..255).member?(r)
    if (0..153).member?(g)
      if(51..204).member?(b)
        return "pink"
      end
    end
  end

  if (64..255).member?(r)
    if (64..255).member?(g)
      if(64..255).member?(b)
        return "grey"
      end
    end
  end

  if (0..32).member?(r)
    if (0..32).member?(g)
      if(0..32).member?(b)
        return "black"
      end
    end
  end

  if (204..255).member?(r)
    if (204..255).member?(g)
      if(204..255).member?(b)
        return "white"
      end
    end
  end


end


# def sort_rgb(ary)
#   r = ary[0]
#   g = ary[1]
#   b = ary[2]

#   #pink
#   if (199..255).member?(r)
#     if (20..192).member?(g)
#       if (114..203).member?(b)
#         return "pink"
#       end
#     end



#   if (139..255).member?(r)
#     if (0..160).member?(g)
#       if(0..128).member?(b)
#         return "red"
#       end
#     end


#   if (254..255).member?(r)
#     if (69..165).member?(g)
#       if(0..120).member?(b)
#         return "orange"
#       end
#     end

#   if (189..255).member?(r)
#     if (180..255).member?(g)
#       if(0..224).member?(b)
#         return "yellow"
#       end
#     end

#   if (128..255).member?(r)
#     if (0..248).member?(g)
#       if(0..205).member?(b)
#         return "brown"
#       end
#     end

#   if (0..173).member?(r)
#     if (100..255).member?(g)
#       if(0..154).member?(b)
#         return "green"
#       end
#     end

#   if (0..224).member?(r)
#     if (128..255).member?(g)
#       if(128..255).member?(b)
#         return "turquoise"
#       end
#     end

#   if (0..176).member?(r)
#     if (0..224).member?(g)
#       if(112..255).member?(b)
#         return "blue"
#       end
#     end

#   if (72..255).member?(r)
#     if (0..230).member?(g)
#       if(0.255).member?(b)
#         return "purple"
#       end
#     end

#   if (240..255).member?(r)
#     if (228..255).member?(g)
#       if(225..255).member?(b)
#         return "white"
#       end
#     end

#   if (0..220).member?(r)
#     if (0..220).member?(g)
#       if(0..220).member?(b)
#         return "grey"
#       end
#     end

#   if (0..1).member?(r)
#     if (0..1).member?(g)
#       if(0..1).member?(b)
#         return "black"
#       end
#     end

#   else
#     return "other"
#   end

# end
